import React from "react";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = ({ workouts, onDelete, onToggleDone }) => (
  <div className="grid md:grid-cols-2 gap-6">
    {workouts.map((workout) => (
      <WorkoutCard
        key={workout._id}
        workout={workout}
        onDelete={onDelete}
        onToggleDone={onToggleDone}
      />
    ))}
  </div>
);

export default WorkoutList; 