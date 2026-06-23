import { useState } from "react";
import { FaHome, FaWallet, FaChartPie, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen
        bg-white/5 backdrop-blur-xl
        border-r border-white/10
        text-white flex flex-col
        transition-all duration-300
        z-50
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* TOP */}
      <div className="flex items-center justify-between p-4">
        {open && (
          <h1 className="text-xl font-bold text-blue-400">
            ExpenseIQ
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <FaBars />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2 mt-6 px-3">

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer"
        >
          <FaHome />
          {open && <span>Dashboard</span>}
        </div>

        <div
          onClick={() => navigate("/expenses")}
          className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer"
        >
          <FaWallet />
          {open && <span>Expenses</span>}
        </div>

        <div
          onClick={() => navigate("/analytics")}
          className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer"
        >
          <FaChartPie />
          {open && <span>Analytics</span>}
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;