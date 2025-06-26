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
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center space-x-2">
          <FaRunning className="text-blue-500 text-2xl" />
          <span className="font-bold text-xl text-gray-800 tracking-tight">FitTrack</span>
        </Link>
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.address}
                  className={({ isActive }) =>
                    `text-base font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 ${
                      isActive ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-700"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center text-base font-medium text-gray-500 hover:text-red-600 transition-colors px-2 py-1"
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
                  `text-base font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 ${
                    isActive ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-700"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-base font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 ${
                    isActive ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-700"
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
