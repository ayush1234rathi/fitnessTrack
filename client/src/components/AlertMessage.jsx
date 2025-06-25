import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

/**
 * type: 'error' | 'success' | 'info'
 * message: string
 */
export default function AlertMessage({ type = "info", message, className = "" }) {
  if (!message) return null;
  let base = "flex items-center p-4 mb-4 rounded text-sm font-medium ";
  let icon = null;
  let color = "";
  switch (type) {
    case "error":
      color = "bg-red-100 text-red-700 border border-red-400";
      icon = <FiAlertCircle className="mr-2 text-xl" />;
      break;
    case "success":
      color = "bg-green-100 text-green-700 border border-green-400";
      icon = <FiCheckCircle className="mr-2 text-xl" />;
      break;
    default:
      color = "bg-blue-100 text-blue-700 border border-blue-400";
      icon = <FiInfo className="mr-2 text-xl" />;
  }
  return (
    <div className={`${base} ${color} ${className}`} role={type === "error" ? "alert" : "status"}>
      {icon}
      <span>{message}</span>
    </div>
  );
} 