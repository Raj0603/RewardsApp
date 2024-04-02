const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a Teacher

exports.registerTeacher = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, teacherWalletId } = req.body;

  const teacher = await Teacher.create({
    name,
    email,
    password,
    teacherWalletId,
  });

  sendToken(teacher, 201, res);
});

//Login Teacher

exports.loginTeacher = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if teacher has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const teacher = await Teacher.findOne({ email }).select("+password");

  if (!teacher) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await teacher.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(teacher, 200, res);
});

//Logout teacher

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forget Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findOne({ email: req.body.email });

  if (!teacher) {
    return next(new ErrorHandler("Teacher not found", 404));
  }

  // Get ResetPasswordToken

  const resetToken = teacher.getResetPasswordToken();

  await teacher.save({ validateBeforeSave: false });

  // const resetpasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const resetpasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is:  \n\n ${resetpasswordUrl} \n\nIf you have not requested this email then, please ignore it `;

  try {
    await sendEmail({
      email: teacher.email,
      subject: "Canteen Password Recovery Email",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email is sent to ${teacher.email} successfully`,
    });
  } catch (error) {
    teacher.resetPasswordToken = undefined;
    teacher.resetPasswordExpire = undefined;

    await teacher.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const teacher = await Teacher.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!teacher) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matches", 400));
  }

  teacher.password = req.body.password;
  teacher.resetPasswordToken = undefined;
  teacher.resetPasswordExpire = undefined;

  await teacher.save();

  sendToken(teacher, 200, res);
});

// Get teacher Dertails
exports.getTeacherDetails = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findById(req.teacher.id);

  res.status(200).json({
    success: true,
    teacher,
  });
});

// Update Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findById(req.teacher.id).select("+password");

  const isPasswordMatched = await teacher.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  teacher.password = req.body.newPassword;

  await teacher.save();

  sendToken(teacher, 200, res);
});

// Update teacher Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newTeacherData = {
    name: req.body.name,
    email: req.body.email,
    walletId: req.body.walletId,
  };

  const teacher = await Teacher.findByIdAndUpdate(
    req.teacher.id,
    newTeacherData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    teacher,
  });
});

// Get all teachers --Admin

exports.getAllTeachers = catchAsyncErrors(async (req, res, next) => {
  const teachers = await Teacher.find();

  let totalTeachers = teachers.length;

  res.status(200).json({
    success: true,
    teachers,
    totalTeachers,
  });
});

// Get Single teachers --Admin

exports.getSingleTeacher = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorHandler(`teacher does not exist with id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    teacher,
  });
});

// Delete teacher --Admin
exports.deleteTeacher = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorHandler(`teacher does not exist with id ${req.params.id}`, 400)
    );
  }

  await teacher.deleteOne();

  res.status(200).json({
    success: true,
    message: "Teacher Deleted Successfully",
  });
});

// Warn Students

exports.warnStudents = catchAsyncErrors(async (req, res, next) => {
  const { email, reason } = req.body;

  const student = await Student.findOne({ email });

  const warning = {
    teacher: req.teacher.name,
    reason: reason,
  };

  student.warnings.push(warning);

  await student.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Increase Rewards

exports.increaseRewards = catchAsyncErrors(async (req, res, next) => {
  const teacherId = req.teacher._id; // Assuming you have authentication middleware
  const reward  = parseInt(req.body.amount); // Assuming amount is sent in the request body

  // Find the teacher by ID
  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    return next(new ErrorHandler("Teacher not found", 404));
  }

  // Update totalRewards field with the new amount
  teacher.totalRewards += reward;

  // Save the updated teacher object
  await teacher.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Rewards increased successfully",
  });
});
