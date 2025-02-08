import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaRunning } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const {logout} = useAuthStore();

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
    <nav className="bg-black text-white shadow-lg w-full sticky top-0">
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

          {authUser && (
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute top-16 sm:gap-4 transition-all right-0  bg-black md:static md:flex md:items-center md:space-x-4 md:w-auto`}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.address}
                  className={({ isActive }) =>
                    `block px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110  hover:text-[#b5fe0e] ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  logout();
                }}
                className="block w-full text-left px-4 py-2 md:inline md:p-0 transition ease-in-out duration-200 hover:scale-110 hover:text-[#b5fe0e]"
              >
                <IoIosLogOut className="text-center text-2xl inline" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
