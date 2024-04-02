const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teachers",
    required: true,
  },
  studentName:{
    type: String,
    ref: "students",
    required: true,
  },
  studentClass:{
    type: String,
    ref: "students",
    required: true,
  },
  achievementName: {
    type: String,
    required: true,
  },
  walletId:{
    type: String,
    ref:"students",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  proof: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Form", formSchema);
