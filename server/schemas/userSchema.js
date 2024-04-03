import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  netBalance: {
    type: Number,
    default: 0,
  },
  transactions: {
    type: Array,
    default: [],
  },
  portfolio: {
    type: Array,
    default: [],
  },
  friends: {
    type: Array,
    ref: "User",
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
