const Expense = require("../models/Expense");

const getDashboardData = async (req, res) => {
  try {
    const transactions = await Expense.find({
      userId: req.user._id,
    });

    const income = transactions.filter((item) => item.type === "income");

    const expense = transactions.filter((item) => item.type === "expense");

    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpense;

    // Total amounts by category
    // For example: food, entertainment, travel
    const categoryMap = {};

    expense.forEach((item) => {
      // if category exists then sum into previous amount
      if (categoryMap[item.category]) {
        categoryMap[item.category] += item.amount;
      } else {
        // else add it as category and add first amount
        categoryMap[item.category] = item.amount;
      }
    });

    const categoryData = Object.keys(categoryMap).map((key) => ({
      category: key,
      amount: categoryMap[key],
    }));

    // Recent Transactions
    const recentTransactions = await Expense.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Monthly Data
    const monthyMap = {};

    expense.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", {
        month: "short",
      });

      if (monthyMap[month]) {
        monthyMap[month] += item.amount;
      } else {
        monthyMap[month] = item.amount;
      }
    });

    const monthlyData = Object.keys(monthyMap).map((key) => ({
      month: key,
      amount: monthyMap[key],
    }));

    res.status(200).json({
      summary: {
        totalIncome,
        totalExpense,
        balance,
      },

      charts: {
        categoryData,
        monthlyData,
      },

      recentTransactions: recentTransactions.map((t) => ({
        id: t._id,
        title: t.title,
        amount: t.amount,
        category: t.category,
        type: t.type,
        date: t.date,
      })),
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboardData };
