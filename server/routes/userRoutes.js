import express from "express";
import User from "../schemas/userSchema.js";
const app = express();
const router = express.Router();
import bcrypt from "bcrypt";

router.get("/", (req, res) => {
  res.send("Hello from userRoutes!");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (!user) {
    res.send("User not found!");
  }
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ username: username })
    .then(async(user) => {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
      res.send("Invalid credentials!");
      }
      else{
        console.log("Password matched!");
        res.send("Logged in!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/register", async (req, res) => {
});

router.get("/all", async (req, res) => {
  const users = await User.find({});
  console.log(users);
  if (users.length === 0 || !users) {
    res.send("No users found!");
  }
  res.send(users);
});

export default router;
