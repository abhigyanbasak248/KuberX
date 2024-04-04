import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
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

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],

  friendsTransactionHistory: [
    {
      friend: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
  income: {
    type: Array,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  transferHistory: {
    type: Array,
    default: [],
  },
  investments: {
    type: Array,
    default: [], //{category(enum),amount,description}
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
