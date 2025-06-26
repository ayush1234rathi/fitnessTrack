import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

/**
 * type: 'error' | 'success' | 'info'
 * message: string
 */
export default function AlertMessage({ type = "info", message, className = "" }) {
  if (!message) return null;
  let base = "flex items-center p-4 mb-4 rounded-lg shadow text-sm font-medium ";
  let icon = null;
  let color = "";
  let border = "";
  switch (type) {
    case "error":
      color = "bg-white text-red-700";
      border = "border-l-4 border-red-500";
      icon = <FiAlertCircle className="mr-3 text-xl text-red-500" />;
      break;
    case "success":
      color = "bg-white text-green-700";
      border = "border-l-4 border-green-500";
      icon = <FiCheckCircle className="mr-3 text-xl text-green-500" />;
      break;
    default:
      color = "bg-white text-blue-700";
      border = "border-l-4 border-blue-500";
      icon = <FiInfo className="mr-3 text-xl text-blue-500" />;
  }
  return (
    <div className={`${base} ${color} ${border} ${className}`} role={type === "error" ? "alert" : "status"}>
      {icon}
      <span>{message}</span>
    </div>
  );
} 