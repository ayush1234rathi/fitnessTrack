import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/auth.service";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
