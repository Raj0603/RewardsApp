const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  className: {
    type: String,
    required: [true, "Please enter your class"],
  },
  role: {
    type: String,
    default: "student",
  },
  walletId: {
    type: String,
    required: [true, "Enter Correct Wallet Id"],
    unique: true,
  },
  warnings: [
    {
      teacher: {
        type: String,
        ref: "teacher",
      },
      reason: {
        type: String,
      },
    },
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// studentSchema.pre("save", async function (next) {
//   if (!this.isModified("walletId")) {
//     next();
//   }
//   this.walletId = await bcrypt.hash(this.walletId, 10);
//   next();
// });

// JWT TOKEN

studentSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password reset Token

studentSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and add to Student Schema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("students", studentSchema);
