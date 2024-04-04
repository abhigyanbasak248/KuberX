// import express from "express";
// import User from "../schemas/userSchema.js";
// const app = express();
// const router = express.Router();
// import bcrypt from "bcrypt";
// import Transaction from "../schemas/transactionSchema.js";

// router.get("/", (req, res) => {
//   res.send("Hello from transactionRoutes!");
// });

// router.post("/new", async (req, res) => {
//   const { to, from, type, amount } = req.body;
//   const toPerson = await User.findOne({ username: to });
//   if (!toPerson) {
//     res.send("Recipient not found!");
//   }
//   const fromPerson = await User.findOne({ username: from });
//   if (!fromPerson) {
//     res.send("Sender not found!");
//   }
//   switch (type) {
//     case "expense":
//       var transaction = new Transaction({
//         to: to,
//         from: from,
//         category: "expense",
//         amount: amount,
//         date: Date.now(),
//       });
//       await transaction.save();
//       fromPerson.transactions.push(transaction._id);
//       break;
//     case "income":
//       var transaction=new Transaction({
//         to: to,
//         from: from,
//         category: "income",
//         amount: amount,
//         date: Date.now(),
//       })
//       toPerson.transactions.push(transaction._id);
//       break;
//     case "transfer":
//       var transaction = new Transaction({
//         to: to,
//         from: from,
//         category: "income",
//         amount: amount,
//         date: Date.now(),
//       });
//       fromPerson.transactions.push(transaction._id);
//       break;
//   }
// });

// router.get("/:id/all", async (req, res) => {
//   const user = await User.findOne({ _id: req.params.id });
//   if (!user) {
//     res.send("User not found!");
//   }
//   res.send(user.transactions);
// });

// export default router;
