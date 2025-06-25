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
    <nav className="bg-gray-900 text-white shadow-lg w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold transition ease-in-out duration-200 hover:scale-110"
          >
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
            } absolute top-16 left-0 right-0 bg-black md:static md:flex md:items-center md:space-x-4 md:w-auto`}
          >
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.address}
                    className={({ isActive }) =>
                      `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-[#b5fe0e] ${
                        isActive ? "font-bold" : ""
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-[#b5fe0e]"
                >
                  <IoIosLogOut className="text-center text-2xl inline" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-[#b5fe0e] ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-[#b5fe0e] ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
