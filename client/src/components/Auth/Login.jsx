import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AlertMessage from "../AlertMessage";
import Button from "../Button";
import { FaRunning } from "react-icons/fa";
import img2 from '../../assets/img2.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background">
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-0">
        <img src={img2} alt="Fitness" className="rounded-2xl object-cover w-full max-w-xs md:max-w-md max-h-[350px] md:max-h-[500px] shadow-xl" />
      </div>
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 md:p-10 border-2 border-primary flex flex-col justify-center">
        <div className="flex flex-col items-center mb-8">
          <FaRunning className="text-5xl text-primary mb-3" />
          <h2 className="text-3xl font-display font-extrabold text-accent mb-2 tracking-widest uppercase">Sign in to your account</h2>
          <p className="text-sm text-secondary">
            Or{' '}
            <Link to="/register" className="font-medium text-primary hover:text-accent underline">
              create a new account
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AlertMessage type="error" message={error} />
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-secondary font-semibold mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-secondary font-semibold mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                placeholder="Password"
              />
            </div>
          </div>
          <Button type="submit" loading={loading} className="w-full mt-2">Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
