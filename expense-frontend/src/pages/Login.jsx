import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService.js";

import {toast} from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold p-3 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="w-full p-3 rounded-lg bg-slate-700 outline-0 focus:outline-1 focus:outline-cyan-300"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="w-full p-3 rounded-lg bg-slate-700 outline-0 focus:outline-1 focus:outline-cyan-300"
            onChange={handleChange}
          />
          <button className="w-full bg-emerald-600 p-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
