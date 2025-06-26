import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaRunning } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    {
      id: 1,
      title: "Dashboard",
      address: "/",
    },
    {
      id: 2,
      title: "Workouts",
      address: "/workout",
    },
    {
      id: 3,
      title: "Profile",
      address: "/profile",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b-4 border-primary shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <FaRunning className="text-primary text-2xl" />
          <span className="font-display text-2xl font-bold text-accent tracking-widest uppercase">FitTrack</span>
        </Link>
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.address}
                  className={({ isActive }) =>
                    `font-display uppercase text-base font-bold px-3 py-1 rounded transition-colors duration-200 hover:text-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent ${
                      isActive ? "text-background bg-accent border-b-4 border-accent" : "text-text"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center font-display uppercase text-base font-bold text-secondary hover:text-background hover:bg-primary transition-colors px-3 py-1 rounded"
              >
                <IoIosLogOut className="text-xl mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `font-display uppercase text-base font-bold px-3 py-1 rounded transition-colors duration-200 hover:text-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent ${
                    isActive ? "text-background bg-accent border-b-4 border-accent" : "text-text"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `font-display uppercase text-base font-bold px-3 py-1 rounded transition-colors duration-200 hover:text-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent ${
                    isActive ? "text-background bg-accent border-b-4 border-accent" : "text-text"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
