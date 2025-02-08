import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  loading: false,
  workouts: null,
  gettingDataByDate: false,
  workoutData: null,

  addWorkout: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/workout/add", data);
    //   set({ workoutData: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending data to db"
      );
    } finally {
      set({ loading: false });
    }
  },

  getWorkoutByDate: async (date) => {
    set({ loading: true });
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
        set({ loading: false });
    }
  },
}));
