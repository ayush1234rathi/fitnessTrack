import React from "react";
import Button from "../Button";
import { FiTrash2 } from "react-icons/fi";

const WorkoutCard = React.memo(({ workout, onDelete, onToggleDone, loading }) => (
  <div className="relative bg-card shadow-xl rounded-xl border-l-4 border-primary p-6 hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between min-h-[180px]">
    <button
      type="button"
      aria-label="Delete workout"
      className="absolute top-3 right-3 text-primary hover:text-background hover:bg-primary p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() => onDelete(workout._id)}
      disabled={loading}
    >
      <FiTrash2 className="w-5 h-5" />
    </button>
    <span className="text-primary text-sm font-display uppercase">#{workout.category}</span>
    <h3 className="text-lg font-display font-bold text-text mt-1 mb-2 uppercase">{workout.workoutName}</h3>
    <p className="text-accent text-sm mb-1">Count: {workout.sets} sets X {workout.reps} reps</p>
    <div className="flex items-center text-secondary text-sm mb-1">
      <span className="mr-4">🏋️ {workout.weight} kg</span>
      <span>⏳ {workout.duration} min</span>
    </div>
    <div className="mb-2 text-sm text-accent">
      Calories Burned: {workout.caloriesBurned} kcal
    </div>
    <Button
      type="button"
      variant={workout.done ? "secondary" : "primary"}
      onClick={() => onToggleDone(workout._id)}
      loading={loading}
      disabled={loading}
    >
      {workout.done ? "Done" : "Mark as Done"}
    </Button>
  </div>
));

export default WorkoutCard; 