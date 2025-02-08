import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/Auth/SignUp";
import LoginForm from "./components/Auth/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Workouts from "./components/Workouts";
import Profile from "./components/Profile";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { TbLoader3 } from "react-icons/tb";
import { Toaster } from "react-hot-toast";

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  
  useEffect(() =>{
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser){
    return (<div className="flex items-center justify-center h-screen">
      <TbLoader3 className="animate-spin" size={45}/>
    </div>)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={!authUser ? <LoginForm/> : <Navigate to="/"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpForm/> : <Navigate to="/"/>}/>
        <Route path="/" element={authUser ? <Dashboard/> : <LoginForm/>}/>
        <Route path="/workout" element={authUser ? <Workouts/> : <LoginForm/>}/>
        <Route path="/profile" element={authUser ? <Profile/> : <LoginForm/>}/>
      </Routes>
      <Footer />
      
      <Toaster/>
    </div>
  );
}

export default App;
