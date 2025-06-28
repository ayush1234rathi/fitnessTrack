import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center  mx-auto">
    <div className="justify-center bg-card border-2 border-primary rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
      <h1 className="text-6xl font-display font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-display font-bold text-accent mb-2 uppercase tracking-widest">Page Not Found</h2>
      <p className="text-text text-center mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="px-6 py-2 bg-primary text-background font-display font-bold rounded-lg shadow hover:bg-accent hover:text-background transition-colors">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
