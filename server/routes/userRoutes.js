import express from "express";
import User from "../schemas/userSchema.js";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import internal from "stream";
import axios from "axios";
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
  console.log(imgpath);
  while (imgpath.startsWith("../")) {
    imgpath = imgpath.slice(3);
  }

  // Replace remaining '/' with '-'
  imgpath = imgpath.replace(/\//g, "$");
  console.log(imgpath);

  // Make a POST request to the Flask API with the image data
  const flaskResponse = await axios.get(
    `http://127.0.0.1:5000/predict/${imgpath}`
  );
  console.log(flaskResponse);
  // Send the Flask API response back to the client
  res.send({
    category: flaskResponse.data.category,
    receiver: flaskResponse.data.receiver,
    amount: flaskResponse.data.amount,
    description: flaskResponse.data.description,
  });
  //res.send({ category: "Electoronics", img: imgpath }); //change this to res.send({category:}); and pass the category from the model
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

router.get("/:id/friends", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate({
      path: "friendsTransactionHistory.friend",
      select: "username",
    });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    const friendsData = user.friendsTransactionHistory.map((transaction) => ({
      _id: transaction.friend._id,
      username: transaction.friend.username,
      amountOwed: transaction.amount,
      color: transaction.amount >= 0 ? "green" : "red",
    }));
    res.status(200).json(friendsData);
  } catch (error) {
    console.error("Error fetching user's friends:", error);
    res.status(500).json({ message: "Server error" });
  }
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
    const user = await User.findById(userId);
    if (!user) {
      return res.send("User not found!");
    }

    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return res.send("Friend not found!");
    }

    // Check if the friend is already in the user's friend list
    if (user.friends.includes(friend._id)) {
      return res.send("Friend already added!");
    }

    // Check if the user is already in the friend's friend list
    if (friend.friends.includes(user._id)) {
      return res.send("User already added as a friend by this friend!");
    }

    // Update user's friend list
    user.friends.push(friend._id);
    user.friendsTransactionHistory.push({ friend: friend._id, amount: 0 });
    await user.save();

    // Update friend's friend list
    friend.friends.push(user._id);
    friend.friendsTransactionHistory.push({ friend: user._id, amount: 0 });
    await friend.save();

    res.send("Friend added successfully!");
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).send("Server error");
  }
});

router.post("/addExpense", async (req, res) => {
  let { receiver, amount, category, description, userID } = req.body;
  amount = parseInt(amount);
  if (Array.isArray(description)) {
    description = description.join(", ");
  }
  try {
    // Find the user by userID
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if receiver is a valid friend username
    let friend;
    for (const friendId of user.friends) {
      const friendUser = await User.findById(friendId);
      if (friendUser.username === receiver) {
        friend = friendUser;
        break;
      }
    }

    if (friend) {
      // Update user's expense
      user.expense.push({
        to: receiver,
        category,
        amount,
        description,
      });

      // Update friend's transaction history
      const friendTransaction = user.friendsTransactionHistory.find(
        (transaction) => transaction.friend.equals(friend._id)
      );
      if (friendTransaction) {
        friendTransaction.amount -= parseInt(amount);
      }

      // Update user's friend transaction history
      const userTransaction = friend.friendsTransactionHistory.find(
        (transaction) => transaction.friend.equals(user._id)
      );
      if (userTransaction) {
        userTransaction.amount += parseInt(amount);
      }

      await user.save();
      await friend.save();

      return res.status(200).json({ message: "Expense added successfully!" });
    } else {
      // If receiver is not a friend, add the expense directly
      user.expense.push({
        to: receiver,
        category,
        amount,
        description,
      });
      await user.save();

      return res.status(200).json({ message: "Expense added successfully!" });
    }
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/addIncome", async (req, res) => {
  let { from, amount, description, userID } = req.body;
  amount = parseInt(amount);
  try {
    // Find the user by userID
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let friend;
    for (const friendId of user.friends) {
      const friendUser = await User.findById(friendId);
      if (friendUser.username === from) {
        friend = friendUser;
        break;
      }
    }

    if (friend) {
      user.income.push({
        from: from,
        amount,
        description,
      });

      // Update friend's transaction history
      const friendTransaction = user.friendsTransactionHistory.find(
        (transaction) => transaction.friend.equals(friend._id)
      );
      if (friendTransaction) {
        friendTransaction.amount += parseInt(amount);
      }

      // Update user's friend transaction history
      const userTransaction = friend.friendsTransactionHistory.find(
        (transaction) => transaction.friend.equals(user._id)
      );
      if (userTransaction) {
        userTransaction.amount -= parseInt(amount);
      }

      await user.save();
      await friend.save();

      return res.status(200).json({ message: "Income added successfully!" });
    } else {
      // If receiver is not a friend, add the expense directly
      user.income.push({
        from: from,
        amount,
        description,
      });
      await user.save();

      return res.status(200).json({ message: "Income added successfully!" });
    }
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addBankTransfer", async (req, res) => {
  try {
    let { userID, fromBankAcc, toBankAcc, amount, description } = req.body;
    amount = parseInt(amount);
    console.log(req.body);
    // Create a new transaction object
    const transaction = {
      fromBankAcc,
      toBankAcc,
      amount,
      description,
      date: new Date(),
    };

    // Find the user by userID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the transfer history of the user
    user.transferHistory.push(transaction);
    await user.save();

    // Return success message
    res.status(200).json({ message: "Transaction added successfully" });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addInvestment", async (req, res) => {
  try {
    let {
      userID,
      category,
      amount,
      description,
      investedWhere,
      reminderPeriod,
    } = req.body;
    amount = parseInt(amount);
    reminderPeriod = parseInt(reminderPeriod);
    // Create a new investment transaction object
    const investmentTransaction = {
      category,
      amount,
      description,
      date: new Date(),
      investedWhere,
      reminderPeriod,
    };

    // Find the user by userID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the investment history of the user
    user.investments.push(investmentTransaction);
    await user.save();

    // Return success message
    res
      .status(200)
      .json({ message: "Investment transaction added successfully" });
  } catch (error) {
    console.error("Error adding investment transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/dashboard/summary/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found!");
    }

    // Calculate sum of income amounts
    const totalIncome = user.income.reduce(
      (acc, income) => acc + income.amount,
      0
    );

    // Calculate sum of expense amounts
    const totalExpense = user.expense.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // Calculate sum of investment amounts
    const totalInvestment = user.investments.reduce(
      (acc, investment) => acc + investment.amount,
      0
    );

    res.json({
      income: totalIncome,
      expense: totalExpense,
      investment: totalInvestment,
    });
  } catch (error) {
    console.error("Error fetching user summary:", error);
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
