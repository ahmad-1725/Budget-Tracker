const Expense = require("../models/Expense");
const client = require("../utils/openrouter");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Get records related to the user
    const expenses = await Expense.find({
      userId: req.user._id,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate user's income and expenses
    expenses.forEach((item) => {
      const amount = Number(item.amount);

      if (item.type === "income") {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }
    });

    // Total per category
    const categoryTotals = {};

    expenses.forEach((item) => {
      const amount = Number(item.amount);

      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }

      categoryTotals[item.category] += amount;
    });
   
    // Prompt for the API
    const prompt = `
      You are a financial assistant.

      User financial summary:
      - Total Income: $${totalIncome}
      - Total Expenses: $${totalExpense}
      - Remaining Balance: $${totalIncome - totalExpense}
      - Category breakdown: ${JSON.stringify(categoryTotals, null, 2)}

      User question:
      ${message}

      IMPORTANT:
      - Use ONLY the numbers above.
      - Do NOT guess or recalculate from categories.
      - Keep answer under 100 (50-100) words.
      `;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { chatWithAI };
