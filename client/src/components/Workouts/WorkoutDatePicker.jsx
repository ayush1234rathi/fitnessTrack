import React from "react";

const WorkoutDatePicker = ({ selectedDate, setSelectedDate }) => (
  <div className="bg-card shadow-xl rounded-xl border-2 border-primary p-6 w-full md:w-1/3 flex flex-col items-center">
    <h2 className="text-lg font-display text-accent mb-2 uppercase tracking-widest">Select Date</h2>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full p-3 border-2 border-primary rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:outline-none text-primary bg-background placeholder:text-accent"
    />
  </div>
);

export default WorkoutDatePicker; 