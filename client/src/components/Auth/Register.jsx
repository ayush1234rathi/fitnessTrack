import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import AlertMessage from "../AlertMessage";
import Button from "../Button";
import { FaRunning } from "react-icons/fa";
import img3 from '../../assets/img3.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await authService.register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background">
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-0">
        <img src={img3} alt="Register" className="rounded-2xl object-cover w-full max-w-xs md:max-w-md max-h-[350px] md:max-h-[500px] shadow-xl" />
      </div>
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 md:p-10 border-2 border-primary flex flex-col justify-center">
        <div className="flex flex-col items-center mb-8">
          <FaRunning className="text-5xl text-primary mb-3" />
          <h2 className="text-3xl font-display font-extrabold text-accent mb-2 tracking-widest uppercase">Create your account</h2>
          <p className="text-sm text-secondary">
            Or{' '}
            <Link to="/login" className="font-medium text-primary hover:text-accent underline">
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AlertMessage type="error" message={error} />
          <div className="space-y-4">
            <div>
              <label htmlFor="fullname" className="block text-secondary font-semibold mb-1">
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                placeholder="Full Name"
              />
            </div>
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
                placeholder="Password"
              />
            </div>
          </div>
          <Button type="submit" loading={loading} className="w-full mt-2">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register; 