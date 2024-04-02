const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Transactions", transactionSchema);
