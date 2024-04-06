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
  income: [
    {
      from: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  expense: [
    {
      to: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  transferHistory: [
    {
      fromBankAcc: {
        type: String,
        required: true,
      },
      toBankAcc: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  investments: [
    {
      category: {
        type: String,
        enum: [
          "Stocks",
          "Crypto",
          "Bonds",
          "Mutual Funds",
          "ETFs",
          "Real Estate",
          "Commodities",
          "Savings",
          "Others",
        ],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      investedWhere: {
        type: String,
        required: false,
      },
      reminderPeriod: {
        type: Number,
        required: false,
      },
    },
  ],

  isPremium: {
    type: Boolean,
    default: false,
  },

  profilePhoto: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3D%2522default%2Bprofile%2Bpicture%2522&psig=AOvVaw1GzoPD3F8cfWpikRYAtO9n&ust=1712416296412000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCWjPutq4UDFQAAAAAdAAAAABAE",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
