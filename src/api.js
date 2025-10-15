// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://whale-app-tcfko.ondigitalocean.app", // replace with your backend API URL
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
