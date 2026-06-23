import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import ChatModal from "../modals/ChatModal";
import Sidebar from "../components/Sidebar";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse text-lg text-white/70">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const summary = data?.summary ?? {};
  const charts = data?.charts ?? {};
  const recentTransactions = data?.recentTransactions ?? [];

  const categoryData = charts?.categoryData ?? [];
  const monthlyData = charts?.monthlyData ?? [];

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={`
    flex-1 relative p-6 overflow-y-auto
    transition-all duration-300
    ${sidebarOpen ? "ml-64" : "ml-20"}
  `}
      >
        {" "}
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />
        {/* CONTENT WRAPPER */}
        <div className="relative p-6 lg:p-10">
          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Expense<span className="text-blue-400">IQ</span>
            </h1>
            <p className="text-white/60 mt-2">
              Smart financial insights at a glance
            </p>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Total Income",
                value: summary.totalIncome,
                color: "from-green-400 to-emerald-600",
              },
              {
                title: "Total Expenses",
                value: summary.totalExpense,
                color: "from-red-400 to-rose-600",
              },
              {
                title: "Balance",
                value: summary.balance,
                color: "from-blue-400 to-indigo-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-r ${item.color} rounded-2xl`}
                />

                <h2 className="text-white/70 text-sm">{item.title}</h2>
                <p className="text-3xl font-bold mt-3">${item.value ?? 0}</p>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* PIE CHART */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Spending Breakdown</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    nameKey="category"
                    dataKey="amount"
                    outerRadius={110}
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
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Monthly Trends</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip />
                  <Bar
                    dataKey="amount"
                    fill="#60A5FA"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

            {recentTransactions.length === 0 ? (
              <p className="text-white/50">No transactions found</p>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-white/50">{item.category}</p>
                    </div>

                    <p
                      className={`font-semibold ${
                        item.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}${item.amount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FLOATING AI BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl"
          >
            🗨️
          </button>

          {/* MODAL */}
          {showModal && <ChatModal setShowModal={setShowModal} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
