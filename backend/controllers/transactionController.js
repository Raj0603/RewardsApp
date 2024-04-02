const Transaction = require("../models/transactionModel");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");

// Transaction from teacher

exports.teacherTransaction = catchAsyncErrors(async (req, res, next) => {
  const { receiverName, amount, receiverId } = req.body;

  const transaction = await Transaction.create({
    senderName: req.teacher.name,
    receiverName: receiverName,
    senderId: req.teacher._id,
    receiverId: receiverId,
    amount: amount,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    transaction,
  });
});

// Teacher Reward Transaction

exports.rewardTransaction = catchAsyncErrors(async (req, res, next) => {
  const { amount, studentWalletId } = req.body;

  const student = await Student.findOne( {walletId: studentWalletId} );

  if(!student){
    return next(new ErrorHandler("Student not found", 404));
  }

  const transaction = await Transaction.create({
    senderName: req.teacher.name,
    receiverName: student.name,
    senderId: req.teacher._id,
    receiverId: student._id,
    amount: amount,
    paidAt: Date.now(),
    
  });

  res.status(201).json({
    success: true,
    transaction,
  });
});

// Transaction from students

exports.studentTransaction = catchAsyncErrors(async (req, res, next) => {
  const { amount, walletId } = req.body;

  const student = await Student.findOne( {walletId: walletId} );

  if(!student){
    return next(new ErrorHandler("Student not found", 404));
  }

  const transaction = await Transaction.create({
    senderName: req.student.name,
    receiverName: student.name,
    senderId: req.student._id,
    receiverId: student._id,
    amount: amount,
    paidAt: Date.now(),
    
  });

  res.status(201).json({
    success: true,
    transaction,
  });
});

// Get all student Transaction

exports.getStudentTransaction = catchAsyncErrors(async (req, res, next) =>{

    const credited = await Transaction.find({receiverId: req.student._id});

    const debited = await Transaction.find({senderId: req.student._id});

    res.status(200).json({
        success: true,
        credited,
        debited,
    });

});

