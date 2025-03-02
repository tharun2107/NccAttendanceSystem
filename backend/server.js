const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

dotenv.config();

const app = express();
app.use(express.json());
// Allow requests only from a specific frontend URL
const corsOptions = {
  origin: "https://kitswncc.netlify.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
console.log("mongo",process.env.MONGO_URI);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
