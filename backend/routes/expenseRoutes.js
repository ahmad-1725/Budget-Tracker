const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

// Get all expenses
router.get("/", protect, getExpenses);

// Add expense
router.post("/", protect, addExpense);

// Delete expense
router.delete("/:id", protect, deleteExpense);

// Update expense
router.put("/:id", protect, updateExpense);

module.exports = router;