import React from "react";

const Loading = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] animate-fade-in">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-lg text-accent font-display font-bold animate-pulse">{message}</span>
  </div>
);

export default Loading; 