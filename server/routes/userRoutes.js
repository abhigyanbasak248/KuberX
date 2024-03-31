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
    .then(async (user) => {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send("Invalid credentials!");
      } else {
        console.log("Password matched!");
        res.send("Logged in!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  console.log(user);
  res.send("User saved!");
});

router.get("/:id/friends", async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (!user) {
    res.send("User not found!");
  }
  res.send(user.friends);
});

router.post("/:id/addFriend", async (req, res) => {
  const id = req.params.id;
  const friendUsername = req.body.friendUsername;
  const friend = await User.findOne({ username: friendUsername });
  if (!friend) {
    res.send("Friend not found!");
  }
  // console.log(friend);
  const user = await User.findOne({ _id: id });
  if (!user) {
    res.send("User not found!");
  }
  user.friends.push(friend._id);
  await user.save();
  res.send(user.friends);
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
