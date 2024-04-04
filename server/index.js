// Import statements
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

// Configuration
const env = dotenv.config().parsed;
const app = express();
const router = express.Router();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3500",
      "http://localhost:5173",
      "http://localhost:4000",
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Database connection
mongoose
  .connect(env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
app.use("/user", userRoutes);

app.all("*", (req, res) => {
  res.send("Page not found :(");
});

app.listen(env.SERVER_PORT, () => {
  console.log(`Server is running on port ${env.SERVER_PORT}`);
});
