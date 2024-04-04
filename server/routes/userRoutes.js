import express from "express";
import User from "../schemas/userSchema.js";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
const app = express();
const router = express.Router();

const storage = multer.diskStorage({
  destination: "../client/uploads", // Directory to save images
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

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

router.post("/upload", upload.single("image"), async (req, res) => {
  console.log("Route hit!");
  console.log(req.body);
  var imgpath = req.file.path;
  imgpath = imgpath.replace(/\\/g, "/");
  console.log("Uploading image...");
  const image = fs.readFileSync(imgpath, {
    encoding: "base64",
  });
  res.send({ category: "Electoronics", img: imgpath }); //change this to res.send({category:}); and pass the category from the model
  // try {
  //   const response = await axios({
  //     method: "POST",
  //     url: "https://detect.roboflow.com/plants-diseases-detection-and-classification/12",
  //     params: {
  //       api_key: "yOhCoSKWhEs97HO8IBBv",
  //     },
  //     data: image,
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });

  //   console.log(response.data);
  //   if (response.data.predictions && response.data.predictions.length > 0) {
  //     const predicted_class = response.data.predictions[0].class;
  //     const confidence = response.data.predictions[0].confidence;
  //     console.log(predicted_class);
  //     const dataToSend = {
  //       predicted_class: predicted_class,
  //       confidence: confidence,
  //     };

  //     console.log("this is the data to be sent:", dataToSend);
  //     res.json(dataToSend);
  //     // res.send("file uploaded");
  //   } else {
  //     res.send("No predictions found in the response.");
  //   }
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("Error uploading file");
  // }
});

router.get("/:id/friendsTransactionHistory", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
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
