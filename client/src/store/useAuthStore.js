import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
        const res = await axiosInstance.get("/users/checkAuth");
        set({authUser: res.data});
    } catch (error) {
        set({authUser: null});
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async (data) => {
    try {
      await axiosInstance.post("/users/logout");
      set({authUser: null});
      toast.success("Logout Successfull")
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
  
  login: async (data) => {
    set({isLoggingIn: true});
    try {
      const res = await axiosInstance.post("/users/login", data);
      set({authUser: res.data});
      toast.success("Login Successfully")
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.message || "Login failed");
    } finally{
      set({isLoggingIn: false});
    }
  }
}));
