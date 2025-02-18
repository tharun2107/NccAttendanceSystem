const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();
const router = express.Router();

// Static admin credentials (for simplicity)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// Set this to something secure in production
console.log(ADMIN_USERNAME, ADMIN_PASSWORD);
// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "5h" });
    res.status(200).json({ token });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
