import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add Token from local storage (automatically)
API.interceptors.request.use((req) => {
  try {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user?.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (err) {
    localStorage.removeItem("user");
  }

  return req;
});

export default API;