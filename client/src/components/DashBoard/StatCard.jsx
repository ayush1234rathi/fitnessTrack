import React from "react";

const StatCard = ({ label, value, colorClass }) => (
  <div className="bg-card p-8 rounded-xl shadow-xl border-2 border-primary flex flex-col items-center">
    <h2 className={`text-lg font-display mb-1 uppercase tracking-widest ${colorClass}`}>{label}</h2>
    <p className={`text-4xl font-extrabold ${colorClass}`}>{value}</p>
  </div>
);

export default StatCard; 