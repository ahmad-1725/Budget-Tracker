const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

console.log("registerUser:", registerUser);
console.log("loginUser:", loginUser);
console.log("typeof registerUser:", typeof registerUser);
console.log("typeof loginUser:", typeof loginUser);

module.exports = router;