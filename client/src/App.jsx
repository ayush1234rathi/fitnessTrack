import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/Auth/SignUp";
import LoginForm from "./components/Auth/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Workouts from "./components/Workouts";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const login = window.localStorage.getItem("isLogin");
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={login ? <Dashboard /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="workout" element={<Workouts />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} /> */}
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/workout" element={<Workouts/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
