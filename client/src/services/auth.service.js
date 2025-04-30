import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Something went wrong");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    
    if (response.data.data?.accessToken) {
      localStorage.setItem("authToken", response.data.data.accessToken);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

const logout = async () => {
  try {
    await axiosInstance.post("/logout");
    localStorage.removeItem("authToken");
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("authToken");
  }
};

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/CurUser");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
};
