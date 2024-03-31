import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["income", "expense", "transfer", "investment", "loan", "other"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
