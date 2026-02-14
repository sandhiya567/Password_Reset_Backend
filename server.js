const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
const User = require("./models/User");

app.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "email createdAt");

    res.json({
      message: "Password Reset Backend is Running 🚀",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.use("/api/auth", authRoutes);
// connect database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
