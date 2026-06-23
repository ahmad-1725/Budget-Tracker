import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getExpenses } from "../services/expenseService.js";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // ------------------------
  // BASIC STATS
  // ------------------------
  const income = expenses.filter((e) => e.type === "income");
  const expense = expenses.filter((e) => e.type === "expense");

  const totalIncome = income.reduce((a, i) => a + Number(i.amount), 0);
  const totalExpense = expense.reduce((a, i) => a + Number(i.amount), 0);
  const balance = totalIncome - totalExpense;

  // ------------------------
  // CATEGORY DATA (TABLE + PIE)
  // ------------------------
  const categoryMap = {};

  expenses.forEach((e) => {
    if (!categoryMap[e.category]) {
      categoryMap[e.category] = {
        category: e.category,
        income: 0,
        expense: 0,
        total: 0,
      };
    }

    if (e.type === "income") {
      categoryMap[e.category].income += Number(e.amount);
    } else {
      categoryMap[e.category].expense += Number(e.amount);
    }

    categoryMap[e.category].total += Number(e.amount);
  });

  const categoryData = Object.values(categoryMap).sort(
    (a, b) => b.total - a.total
  );

  // ------------------------
  // MONTHLY DATA
  // ------------------------
  const monthMap = {};

  expenses.forEach((e) => {
    const date = new Date(e.createdAt || Date.now());
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthMap[month]) {
      monthMap[month] = 0;
    }

    monthMap[month] += Number(e.amount);
  });

  const monthlyData = Object.keys(monthMap).map((m) => ({
    month: m,
    amount: monthMap[m],
  }));

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <div
        className={`
          flex-1 p-6 transition-all duration-300 overflow-y-auto
          ${sidebarOpen ? "ml-64" : "ml-20"}
        `}
      >

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold">
            Analytics <span className="text-blue-400">Dashboard</span>
          </h1>
          <p className="text-white/60 mt-2">
            Deep insights into your financial behavior
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/60">Total Income</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              ${totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/60">Total Expenses</p>
            <p className="text-3xl font-bold text-red-400 mt-2">
              ${totalExpense.toFixed(2)}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/60">Balance</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* PIE CHART */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-6">
              Category Breakdown
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={110}
                  label
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-6">
              Monthly Spending
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip />
                <Bar dataKey="amount" fill="#60A5FA" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LINE CHART */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-6">
              Spending Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#A78BFA"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CATEGORY TABLE */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-6">
            Category Wise Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/60 border-b border-white/10">
                  <th className="py-3">Category</th>
                  <th className="py-3">Income</th>
                  <th className="py-3">Expense</th>
                  <th className="py-3">Total</th>
                </tr>
              </thead>

              <tbody>
                {categoryData.map((cat, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-3 font-medium">{cat.category}</td>

                    <td className="py-3 text-green-400">
                      ${cat.income.toFixed(2)}
                    </td>

                    <td className="py-3 text-red-400">
                      ${cat.expense.toFixed(2)}
                    </td>

                    <td className="py-3 font-bold text-blue-400">
                      ${cat.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;