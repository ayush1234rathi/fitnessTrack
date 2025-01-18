import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="text-xl font-bold">
            FitTrack
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/dashboard" className="hover:text-indigo-200">
              Dashboard
            </Link>
            <Link to="/workouts" className="hover:text-indigo-200">
              Workouts
            </Link>
            <Link to="/profile" className="hover:text-indigo-200">
              Profile
            </Link>
            {/* Logout Button */}
            <button className="hover:text-indigo-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
