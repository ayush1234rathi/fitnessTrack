import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-12 max-w-md w-full text-center border border-gray-100">
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button as={Link} to="/" className="mt-4">Go to Homepage</Button>
      </div>
    </div>
  );
};

export default NotFound;
