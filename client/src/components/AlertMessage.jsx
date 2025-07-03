import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

/**
 * type: 'error' | 'success' | 'info'
 * message: string
 */
export default function AlertMessage({ type = "info", message, className = "" }) {
  if (!message) return null;
  let base = "flex items-center p-4 mb-4 rounded-lg shadow text-sm font-display uppercase font-bold ";
  let icon = null;
  let color = "";
  let border = "";
  switch (type) {
    case "error":
      color = "bg-card text-primary";
      border = "border-l-4 border-primary";
      icon = <FiAlertCircle className="mr-3 text-xl text-primary" />;
      break;
    case "success":
      color = "bg-card text-green-400";
      border = "border-l-4 border-green-400";
      icon = <FiCheckCircle className="mr-3 text-xl text-green-400" />;
      break;
    default:
      color = "bg-card text-accent";
      border = "border-l-4 border-accent";
      color = "bg-[#181818] text-neon";
      border = "border-l-4 border-neon";
      icon = <FiInfo className="mr-3 text-xl text-neon" />;
  }
  return (
    <div className={`${base} ${color} ${border} ${className}`} role={type === "error" ? "alert" : "status"}>
      {icon}
      <span>{message}</span>
    </div>
  );
} 