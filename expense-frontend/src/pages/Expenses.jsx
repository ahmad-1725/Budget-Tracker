import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import { toast } from "sonner";

import Sidebar from "../components/Sidebar";
import ConfirmModal from "../modals/ConfirmModal";

import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../services/expenseService.js";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [category, setCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateExpense(editingId, formData);
        toast.success("Transaction updated");
        setEditingId(null);
      } else {
        await addExpense(formData);
        toast.success("Transaction added");
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "expense",
      });

      fetchExpenses();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteClick = (id, category) => {
    setDeleteId(id);
    setCategory(category);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteExpense(deleteId);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
      setDeleteId(null);
      setCategory(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
    setCategory(null);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      amount: item.amount,
      category: item.category,
      type: item.type,
    });
  };

  const totalIncome = expenses
    .filter((i) => i.type === "income")
    .reduce((a, i) => a + Number(i.amount), 0);

  const totalExpense = expenses
    .filter((i) => i.type === "expense")
    .reduce((a, i) => a + Number(i.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

    {/* SIDEBAR */}
<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    {/* MAIN CONTENT */}
<div
  className={`
    flex-1 relative p-6 overflow-y-auto
    transition-all duration-300
    ${sidebarOpen ? "ml-64" : "ml-20"}
  `}
>
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[130px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[130px] rounded-full" />

      <div className="relative">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold">
            Expense<span className="text-blue-400">Tracker</span>
          </h1>
          <p className="text-white/60 mt-2">
            Track money flows with clarity and control
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {[
            {
              title: "Income",
              value: totalIncome,
              icon: <FaArrowUp />,
              color: "from-green-400 to-emerald-600",
            },
            {
              title: "Expenses",
              value: totalExpense,
              icon: <FaArrowDown />,
              color: "from-red-400 to-rose-600",
            },
            {
              title: "Balance",
              value: balance,
              icon: <FaWallet />,
              color: "from-blue-400 to-indigo-600",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-[1.03] transition"
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${card.color} rounded-2xl`} />

              <div className="flex justify-between items-center relative">
                <div>
                  <p className="text-white/60">{card.title}</p>
                  <h2 className="text-3xl font-bold mt-2">
                    ${card.value.toFixed(2)}
                  </h2>
                </div>
                <div className="text-white/70 text-xl">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="mb-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-6">
            {editingId ? "Update Transaction" : "Add Transaction"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >
            {["title", "amount", "category"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 outline-none"
              />
            ))}

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <option className="text-black" value="expense">Expense</option>
              <option className="text-black" value="income">Income</option>
            </select>

            <button
              type="submit"
              className="md:col-span-4 p-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition"
            >
              {editingId ? "Update Transaction" : "Add Transaction"}
            </button>
          </form>
        </div>

        {/* TRANSACTIONS */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-6">Transactions</h2>

          {expenses.length === 0 ? (
            <p className="text-white/50 text-center py-10">
              No transactions yet
            </p>
          ) : (
            <div className="space-y-3">
              {expenses.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-white/50 text-sm">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p
                      className={`font-bold ${
                        item.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ${item.amount}
                    </p>

                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 rounded bg-yellow-500 text-black text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteClick(item._id, item.category)
                      }
                      className="px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          category={category}
        />
      )}
    </div>
    </div>
  );
}

export default Expenses;