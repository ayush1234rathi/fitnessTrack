import React, { useMemo } from "react";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = React.memo(({ workouts, onDelete, onToggleDone, loadingIds = [] }) => {
  const workoutCards = useMemo(() => (
    workouts.map((workout) => (
      <WorkoutCard
        key={workout._id}
        workout={workout}
        onDelete={onDelete}
        onToggleDone={onToggleDone}
        loading={loadingIds.includes(workout._id)}
      />
    ))
  ), [workouts, onDelete, onToggleDone, loadingIds]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {workoutCards}
    </div>
  );
});

export default WorkoutList; 