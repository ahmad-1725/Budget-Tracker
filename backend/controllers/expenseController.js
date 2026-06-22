const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }
    const expense = await Expense.create({
      userId: req.user._id,
      title,
      amount,
      category,
      type,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Check ownership
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Ownership check
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
