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
  /*await User.deleteMany({});
  console.log("Users deleted!");
  for (let i = 1; i <= 0; i++) {
    const user = new User({
      username: "User" + i,
      password: "1234",
      phone: 1234567890 + i,
      email: `user${i}@example.com`,
      income: 0,
      expense: 0,
      transferHistory: [],
      investments: [],
      friendsTransactionHistory: [],
      friends: [],
      isPremium: false,
    });
    await user.save();
  }
  console.log("5 users added!");
  mongoose.connection.close();*/
};
const generateRandomExpenses = () => {
  const categories = [
    "Beverages",
    "Electronics",
    "Appliances",
    "Arts, Crafts & Sewing",
    "Automotive",
    "Baby Products",
    "Beauty Products",
    "Cell Phones & Accessories",
    "Clothing, Shoes & Jewelry",
    "Electronics",
    "Grocery & Gourmet Food",
    "Health & Personal Care",
    "Industrial & Scientific",
    "Musical Instruments",
    "Office Products",
    "Patio, Lawn & Garden",
    "Pet Supplies",
    "Sports & Outdoors",
    "Tools & Home Improvement",
    "Toys & Games",
    "Others",
  ];
  const descriptionsByCategory = {
    Beverages: [
      "Coffee at Starbucks",
      "Lunch at a cafe",
      "Happy hour with friends",
      "Bottle of wine",
    ],
    Electronics: [
      "New smartphone",
      "Laptop accessories",
      "Gaming console",
      "Headphones",
    ],
    Appliances: ["Microwave oven", "Coffee maker", "Toaster", "Blender"],
    "Arts, Crafts & Sewing": [
      "Painting supplies",
      "Knitting yarn",
      "Sewing machine",
      "Art books",
    ],
    Automotive: ["Car wash", "Oil change", "Tire rotation", "Car accessories"],
    "Baby Products": ["Diapers", "Baby formula", "Stroller", "Baby clothes"],
    "Beauty Products": [
      "Shampoo and conditioner",
      "Makeup",
      "Skincare products",
      "Perfume",
    ],
    "Cell Phones & Accessories": [
      "Phone case",
      "Charger",
      "Screen protector",
      "Bluetooth headset",
    ],
    "Clothing, Shoes & Jewelry": ["New dress", "Sneakers", "Watch", "Necklace"],
    "Grocery & Gourmet Food": [
      "Weekly groceries",
      "Specialty cheese",
      "Imported chocolates",
      "Organic produce",
    ],
    "Health & Personal Care": [
      "Medicine",
      "Gym membership",
      "Vitamins",
      "Fitness tracker",
    ],
    "Industrial & Scientific": [
      "Lab equipment",
      "Safety gear",
      "Scientific instruments",
      "Industrial supplies",
    ],
    "Musical Instruments": [
      "Guitar strings",
      "Keyboard stand",
      "Drum sticks",
      "Sheet music",
    ],
    "Office Products": [
      "Printer ink",
      "Notebooks",
      "Desk organizer",
      "Stapler",
    ],
    "Patio, Lawn & Garden": [
      "Garden hose",
      "Patio furniture",
      "Lawn mower",
      "Grill accessories",
    ],
    "Pet Supplies": [
      "Dog food",
      "Cat litter",
      "Pet toys",
      "Fish tank supplies",
    ],
    "Sports & Outdoors": [
      "Running shoes",
      "Tent",
      "Bicycle helmet",
      "Camping gear",
    ],
    "Tools & Home Improvement": [
      "Power drill",
      "Paintbrushes",
      "Toolbox",
      "Light bulbs",
    ],
    "Toys & Games": ["Board game", "LEGO set", "Action figures", "Puzzle"],
    Others: [
      "Miscellaneous item 1",
      "Miscellaneous item 2",
      "Miscellaneous item 3",
      "Miscellaneous item 4",
    ],
  };

  const numExpenses = Math.floor(Math.random() * 2) + 5; // Random number of expenses between 5 and 6

  const expenses = [];
  for (let i = 0; i < numExpenses; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const description =
      descriptionsByCategory[category][
        Math.floor(Math.random() * descriptionsByCategory[category].length)
      ];
    const amount = Math.floor(Math.random() * 50) + 10; // Random amount between 10 and 60
    expenses.push({ category, description, amount });
  }
  return expenses;
};
const generateRandomDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const seedIncomeExpense = async () => {
  const userId = "6610d28a610d640e537724fc";
  try {
    // Find the user by userID
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found!");
      return;
    }

    // Generate random dates between 1st March and 6th April 2024
    const startDate = new Date("2024-03-01");
    const endDate = new Date("2024-04-06");
    let currentDate = startDate;

    // Loop through each day and add random expenses
    while (currentDate <= endDate) {
      const expenses = generateRandomExpenses();
      expenses.forEach((expense) => {
        const date = generateRandomDate(currentDate, currentDate);
        user.income.push({
          from: expense.category,
          amount: expense.amount,
          description: expense.description,
          date,
        });
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Save the user with the updated expense data
    await user.save();

    console.log("Expense data with custom date added successfully!");
  } catch (error) {
    console.error("Error seeding expense data:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};
seedIncomeExpense();
