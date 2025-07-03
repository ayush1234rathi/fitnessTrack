import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t-4 border-primary text-text py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <span className="font-display font-bold text-lg text-accent uppercase tracking-widest">FitTrack</span>
          <span className="text-accent text-sm font-display uppercase">Your personal fitness companion</span>
        </div>
        <div className="flex space-x-6 text-sm font-display uppercase">
          <Link to="/about" className="font-display uppercase text-base font-bold px-3 py-1 rounded transition-colors duration-200 text-text hover:text-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent">About</Link>
          <Link to="/contact" className="font-display uppercase text-base font-bold px-3 py-1 rounded transition-colors duration-200 text-text hover:text-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent">Contact</Link>
          <Link to="/privacy" className="font-display uppercase text-base font-bold px-3 py-1 rounded transition-colors duration-200 text-text hover:text-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent">Privacy Policy</Link>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-accent font-display uppercase">
        © {new Date().getFullYear()} FitTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
