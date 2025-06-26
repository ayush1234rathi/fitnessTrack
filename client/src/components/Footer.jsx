import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background border-t-4 border-primary text-text py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <span className="font-display font-bold text-lg text-accent uppercase tracking-widest">FitTrack</span>
          <span className="text-accent text-sm font-display uppercase">Your personal fitness companion</span>
        </div>
        <div className="flex space-x-6 text-sm font-display uppercase">
          <a href="#" className="hover:text-background hover:bg-accent px-2 py-1 rounded transition-colors">About</a>
          <a href="#" className="hover:text-background hover:bg-accent px-2 py-1 rounded transition-colors">Contact</a>
          <a href="#" className="hover:text-background hover:bg-accent px-2 py-1 rounded transition-colors">Privacy Policy</a>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-accent font-display uppercase">
        © {new Date().getFullYear()} FitTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
