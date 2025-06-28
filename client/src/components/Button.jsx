import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  let base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg font-display uppercase font-bold transition focus:outline-none focus:ring-2 focus:ring-primary ";
  let color =
    variant === "secondary"
      ? "bg-accent text-background border-2 border-accent hover:bg-background hover:text-accent focus:ring-accent"
      : "bg-primary text-background border-2 border-primary hover:bg-background hover:text-primary focus:ring-primary";
  let disabledStyle = disabled || loading ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button
      type={type}
      className={`${base} ${color} ${disabledStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
} 