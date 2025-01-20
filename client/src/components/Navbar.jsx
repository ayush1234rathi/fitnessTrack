import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaRunning } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import authService from "../services/auth.service";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold transition ease-in-out duration-200 hover:scale-110">
            <FaRunning className="inline text-3xl" />
            FitTrack
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <HiOutlineX className="text-3xl" />
              ) : (
                <HiOutlineMenu className="text-3xl" />
              )}
            </button>
          </div>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-16 sm:gap-4 transition-all right-0  bg-indigo-600 md:static md:flex md:items-center md:space-x-4 md:w-auto`}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110  hover:text-indigo-200 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/workout"
              className={({ isActive }) =>
                `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-indigo-200 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Workouts
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-indigo-200 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Profile
            </NavLink>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-indigo-200"
            >
              <IoIosLogOut className="text-center text-2xl inline" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;