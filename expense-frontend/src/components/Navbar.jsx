import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-slate-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">ExpenseIQ</h1>

      <div className="flex gap-4">
        <Link to="/" className="text-white">
          Dashboard
        </Link>

        <Link to="/expenses" className="text-white">
          Expenses
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
