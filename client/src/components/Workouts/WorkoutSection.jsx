import React from "react";
import WorkoutList from "./WorkoutList";
import WorkoutSummary from "./WorkoutSummary";

const WorkoutSection = React.memo(({ workouts, onDelete, onToggleDone, loadingIds }) => {
  // Calculate total calories for done workouts only
  const totalCaloriesBurned = workouts.reduce((sum, w) => w.done ? sum + (w.caloriesBurned || 0) : sum, 0);

  return (
    <div>
      <h1 className="text-3xl font-display font-extrabold text-accent mb-6 text-center tracking-widest uppercase drop-shadow-lg">Workout Tracker</h1>
      <h2 className="text-xl font-display text-accent mb-4 uppercase tracking-widest">Today's Workouts</h2>
      <WorkoutList workouts={workouts} onDelete={onDelete} onToggleDone={onToggleDone} loadingIds={loadingIds} />
      <WorkoutSummary totalCaloriesBurned={totalCaloriesBurned} />
    </div>
  );
});

export default WorkoutSection; 