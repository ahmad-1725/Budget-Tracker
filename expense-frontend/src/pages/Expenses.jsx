import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

import { toast } from "sonner";

import Navbar from "../components/Navbar";
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

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // Fetch Expenses
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

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Expense
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

  // Delete Expense
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
  // Dashboard Stats
  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalExpense = expenses
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Expense Tracker
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Track your income and expenses with style.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80">Income</p>
                <h2 className="text-3xl font-bold mt-2">
                  ${totalIncome.toFixed(2)}
                </h2>
              </div>

              <FaArrowUp size={32} />
            </div>
          </div>

          <div className="bg-linear-to-r from-red-500 to-pink-600 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80">Expenses</p>
                <h2 className="text-3xl font-bold mt-2">
                  ${totalExpense.toFixed(2)}
                </h2>
              </div>

              <FaArrowDown size={32} />
            </div>
          </div>

          <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80">Balance</p>
                <h2 className="text-3xl font-bold mt-2">
                  ${balance.toFixed(2)}
                </h2>
              </div>

              <FaWallet size={32} />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Update Transaction" : "Add Transaction"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Transaction Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              type="submit"
              className="
                md:col-span-4
                bg-linear-to-r
                from-blue-500
                via-purple-500
                to-pink-500
                hover:scale-[1.02]
                transition-all
                duration-300
                p-3
                rounded-xl
                font-semibold
                shadow-lg
              "
            >
                         {editingId ? "Update Transaction" : "Add Transaction"}

            </button>
          </form>
        </div>

        {/* Transactions */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">All Transactions</h2>

          {expenses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl text-slate-400 font-semibold">
                No transactions yet
              </h3>

              <p className="text-slate-500 mt-2">
                Start by adding your first income or expense.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.map((item) => (
                <div
                  key={item._id}
                  className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    md:items-center
                    gap-4
                    bg-slate-800/60
                    border
                    border-slate-700
                    p-5
                    rounded-2xl
                    hover:border-blue-500
                    hover:shadow-lg
                    hover:shadow-blue-500/10
                    transition-all
                    duration-300
                  "
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>

                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-slate-400">{item.category}</p>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.type === "income"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p
                      className={`text-xl font-bold ${
                        item.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ${item.amount}
                    </p>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id, item.type)}
                      className="
                        bg-red-500/20
                        text-red-400
                        hover:bg-red-500
                        hover:text-white
                        px-4
                        py-2
                        rounded-xl
                        transition-all
                        duration-300
                      "
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
      {showModal && (
        <ConfirmModal onConfirm={confirmDelete} onCancel={cancelDelete} category={category } />
      )}
    </div>
  );
}

export default Expenses;
