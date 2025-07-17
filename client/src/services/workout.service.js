import axios from "axios";

const API_URL = "https://fitness-server-0bzg.onrender.com/api/v1/workout";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const getWorkouts = async (date) => {
  try {
    const response = await axiosInstance.get(`/getWorkoutsByDate?date=${date}`);
    return response.data.todaysWorkouts;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch workouts.");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

const addWorkout = async (workoutData) => {
  try {
    const response = await axiosInstance.post("/add", workoutData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to add workout.");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

const getDashboardStats = async () => {
  try {
    const response = await axiosInstance.get("/getWorkouts");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch dashboard stats.");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export default {
  getWorkouts,
  addWorkout,
  getDashboardStats,
};
