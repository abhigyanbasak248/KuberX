import mongoose from "mongoose";
import User from "../schemas/userSchema.js";
import dotenv from "dotenv";
mongoose
  .connect(
    "mongodb+srv://devthakkarlm10:ZF8OEUe13IijnQZp@cluster0.io7m9w6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const seedEmptyUsers = async () => {
  await User.deleteMany({});
  console.log("Users deleted!");
  for (let i = 1; i <= 5; i++) {
    const user = new User({
      username: "User" + i,
      password: "1234",
      phone: 1234567890 + i,
      email: `user${i}@example.com`,
      netBalance: 0,
      transactions: [],
      portfolio: [],
    });
    await user.save();
  }
  console.log("5 users added!");
  mongoose.connection.close();
};

seedEmptyUsers();
