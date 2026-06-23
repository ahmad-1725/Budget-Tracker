import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import ChatModal from "../modals/ChatModal";

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
} from "recharts";


function Dashboard() {
  const [data, setData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        console.log("Dashboard API:", res);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const summary = data?.summary ?? {};
  const charts = data?.charts ?? {};
  const recentTransactions = data?.recentTransactions ?? [];

  const categoryData = charts?.categoryData ?? [];
  const monthlyData = charts?.monthlyData ?? [];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">ExpenseIQ Dashboard</h1>
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2>Total Income</h2>
          <p className="text-3xl font-bold mt-2">${summary.totalIncome ?? 0}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2>Total Expenses</h2>
          <p className="text-3xl font-bold mt-2">
            ${summary.totalExpense ?? 0}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2>Balance</h2>
          <p className="text-3xl font-bold mt-2">${summary.balance ?? 0}</p>
        </div>
      </div>
      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* PIE CHART */}
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">Category Spending</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                nameKey="category"
                dataKey="amount"
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">Monthly Expenses</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* RECENT TRANSACTIONS */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-400">No transactions found</p>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((item, index) => (
              <div
                key={item._id || index}
                className="flex justify-between bg-slate-700 px-10 p-4 rounded-xl"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.category}</p>
                </div>

                <p
                  className={
                    item.type === "income" ? "text-green-400" : "text-red-400"
                  }
                >
                  ${item.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Floating decorative circle */}
      <button
        onClick={() => setShowModal(true)}
        className="
            fixed bottom-6 right-6
            w-14 h-14
            rounded-full
            bg-linear-to-r from-blue-500 to-purple-600
            text-white
            shadow-lg
            hover:scale-110
            transition-all
            flex items-center justify-center
            text-2xl
          "
      >
        💬
      </button>{" "}
      {/* Modal */}
      {showModal && <ChatModal setShowModal={setShowModal} />}{" "}
    </div>
  );
}

export default Dashboard;
