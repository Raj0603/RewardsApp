const Form = require("../models/formModel");
const Teacher = require("../models/teacherModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");
const cloudinary = require("cloudinary");

// Create new Form
exports.newForm = catchAsyncErrors(async (req, res, next) => {
  const { achievementName, category, description } = req.body;

  const getTeacher = await Teacher.find({ name: req.body.teacherName });

  if (!getTeacher) {
    return res
      .status(404)
      .json({ success: false, message: "Teacher not found" });
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.proof, {
    folder: "proofs",
  });

  const form = await Form.create({
    student: req.student._id,
    teacher: getTeacher[0]._id,
    studentName : req.student.name,
    studentClass: req.student.className,
    achievementName,
    walletId: req.student.walletId,
    category,
    description,
    proof:{ public_id: myCloud.public_id, url: myCloud.secure_url },
    submittedAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    form,
  });
});

// Get Form -- Student

exports.getStudentForm = catchAsyncErrors(async (req, res, next) => {
  const studentForm = await Form.find({ student: req.student._id });

  if (!studentForm) {
    return next(new ErrorHandler("Form not found with this id", 404));
  }

  res.status(200).json({
    sucess: true,
    studentForm,
  });
});

// Get Form --Teacher

exports.getTeacherForm = catchAsyncErrors(async (req, res, next) => {
  const teacherForm = await Form.find({ teacher: req.teacher._id });

  if (!teacherForm) {
    return next(new ErrorHandler("Form not found with this id", 404));
  }

  res.status(200).json({
    sucess: true,
    teacherForm,
  });
});

// Get Form Details 

exports.getFormDetails = catchAsyncErrors(async (req, res, next) => {
  const form = await Form.findById(req.params.id);

  if (!form) {
    return next(new ErrorHandler("Item not Found", 404));
  }

  res.status(200).json({
    success: true,
    form,
  });
});

// Approve / Reject Form

exports.updateForm = catchAsyncErrors(async (req, res, next) => {
  let form = Form.findById(req.params.id);

  if (!form) {
    return next(new ErrorHandler("Item not Found", 404));
  }

  form = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    form,
  });
});

// Delete Form

exports.deleteForm = catchAsyncErrors(async (req, res, next) => {
  const form = await Form.findById(req.params.id);

  if (!form) {
    return next(new ErrorHandler("Form not Found", 404));
  }

  await form.deleteOne();

  res.status(200).json({
    success: true,
    message: "Form deleted successfully",
  });
});
