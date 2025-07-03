import React from "react";

const WorkoutSummary = ({ totalCaloriesBurned }) => (
  <div className="mt-4 text-right font-semibold text-primary">
    Total Calories Burned (Done): {totalCaloriesBurned} kcal
  </div>
);

export default WorkoutSummary; 