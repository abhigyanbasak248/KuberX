import express from "express";
import User from "../schemas/userSchema.js";
import jsonwebtoken from "jsonwebtoken";
const app = express();
const router = express.Router();
import bcrypt from "bcryptjs";
router.use(express.json());

router.get("/", (req, res) => {
  res.send("Hello from userRoutes!");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ message: " User does not exist!", emoji: "👤" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.json({ message: "Invalid credentials!", emoji: "❌" });
  }
  const token = jsonwebtoken.sign({ id: user._id }, "secretkey");
  res.json({
    token,
    userID: user._id,
    message: "User logged in successfully!",
    emoji: "👋🏻",
    username: user.username,
  });
});

router.post("/register", async (req, res) => {
  const { username, phone, password, email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.json({ message: "User already exists!", emoji: "⚠️" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    phone,
    password: hashedPassword,
    email,
  });
  await newUser.save();
  const token = jsonwebtoken.sign({ userID: newUser._id }, "secretkey");
  res.json({
    message: "User registered successfully!",
    emoji: "✅",
    token,
    userID: newUser._id,
    username: newUser.username,
  });
});

router.get("/all", async (req, res) => {
  const users = await User.find({});
  console.log(users);
  if (users.length === 0 || !users) {
    res.send("No users found!");
  }
  res.send(users);
});

router.get("/:id/friendsTransactionHistory", async (req, res) => {
  const userId = req.params.id;
  const user=await User.findById(userId);
  if(!user){
    res.send("User not found!");
  }
  res.send(user.friendsTransactionHistory);
});

router.post("/:id/addFriend", async (req, res) => {
  const userId = req.params.id;
  const friendUsername = req.body.friendUsername;

  try {
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return res.send("Friend not found!");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.send("User not found!");
    }
    if (user.friends.includes(friend._id)) {
      return res.send("Friend already added!");
    }
    user.friends.push(friend._id);
    user.amountOwed.push({ friend: friend._id, amount: 0 });
    await user.save();
    res.send("Friend added successfully!");
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (!user) {
    res.send("User not found!");
  }
  res.send(user);
});

export default router;
