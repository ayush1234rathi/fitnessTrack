import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t text-gray-500 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <span className="font-bold text-lg text-blue-600">FitTrack</span>
          <span className="text-gray-400 text-sm">Your personal fitness companion</span>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} FitTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
