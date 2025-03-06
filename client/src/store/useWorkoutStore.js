import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useWorkoutstore = create((set) => ({
  gettingWorkout: false,
  addingWorkout: false,
  workouts: null,
  gettingDataByDate: false,
  workoutData: null,
  gettingDashboard: false,
  dashboardData: null,

  addWorkout: async (data) => {
    set({ addingWorkout: true });
    try {
      await axiosInstance.post("/workout/add", data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending data to db"
      );
    } finally {
      set({ addingWorkout: false });
    }
  },

  getWorkoutByDate: async (date) => {
    set({ gettingWorkout: true });
    try {
      const res = await axiosInstance.get(
        `/workout/getWorkoutsByDate?date=${date}`
      );
      set({ workouts: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending data to db"
      );
    } finally {
      set({ gettingWorkout: false });
    }
  },

  getWorkout: async () => {
    set({ gettingDashboard: true });
    try {
      const res = await axiosInstance.get("/workout/getWorkouts");
      set({ dashboardData: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending data to db"
      );
    } finally {
        set({ gettingDashboard: false });
    }
  }
}));
