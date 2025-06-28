import React from "react";

const AchievementList = ({ stats }) => (
  <div className="bg-card p-8 rounded-xl shadow-xl border-2 border-primary">
    <h2 className="text-lg font-display text-accent mb-4 uppercase tracking-widest">Recent Achievements</h2>
    <ul className="space-y-2">
      <li className="flex items-center text-text">
        <span className="mr-2">🏆</span>
        {stats.totalWorkouts} workouts completed this week
      </li>
      <li className="flex items-center text-text">
        <span className="mr-2">🔥</span>
        {stats.totalCaloriesBurnt} calories burned in total
      </li>
      <li className="flex items-center text-text">
        <span className="mr-2">💪</span>
        Average of {Math.round(stats.avgCaloriesBurntPerWorkout)} calories per workout
      </li>
    </ul>
  </div>
);

export default AchievementList; 