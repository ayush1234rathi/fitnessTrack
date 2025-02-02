import React, { useState, useEffect } from "react";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [newWorkout, setNewWorkout] = useState({
    category: "",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    caloriesBurned: "",
  });

  useEffect(() => {
    loadHardcodedData();
  }, [selectedDate]);

  const loadHardcodedData = () => {
    const mockWorkouts = [
      { _id: "1", category: "Legs", workoutName: "Squat", sets: 5, reps: 15, weight: 30, duration: "20 min" },
      { _id: "2", category: "Back", workoutName: "Lat Pulldown", sets: 5, reps: 15, weight: 30, duration: "10 min" },
      { _id: "3", category: "Shoulder", workoutName: "Shoulder Press", sets: 5, reps: 15, weight: 30, duration: "25 min" },
      { _id: "4", category: "Abs", workoutName: "Crunches", sets: 5, reps: 15, weight: 30, duration: "15 min" },
    ];
    setWorkouts(mockWorkouts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWorkouts = [
      ...workouts,
      { _id: Date.now().toString(), ...newWorkout, date: selectedDate },
    ];
    setWorkouts(updatedWorkouts);
    setNewWorkout({ category: "", workoutName: "", sets: "", reps: "", weight: "", duration: "", caloriesBurned: "" });
  };

  return (
  <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 max-w-5xl w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Workout Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="bg-gray-50 shadow-md rounded-lg p-5 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Workouts Display */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Today's Workouts</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {workouts.map((workout) => (
              <div key={workout._id} className="bg-gray-50 shadow-md rounded-lg p-4 border-l-4 border-[#39ff14] hover:scale-105 transition-transform duration-200">
                <span className="text-[#39ff14] text-sm font-semibold">#{workout.category}</span>
                <h3 className="text-lg font-semibold text-gray-800">{workout.workoutName}</h3>
                <p className="text-gray-600 text-sm">Count: {workout.sets} sets X {workout.reps} reps</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <span className="mr-4">🏋️ {workout.weight} kg</span>
                  <span>⏳ {workout.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Workout Form */}
      <div className="mt-6 bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Workout</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Workout Name" value={newWorkout.workoutName} onChange={(e) => setNewWorkout({ ...newWorkout, workoutName: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"/>
          <input type="text" placeholder="Category" value={newWorkout.category} onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"/>
          <input type="number" placeholder="Sets" value={newWorkout.sets} onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"/>
          <input type="number" placeholder="Reps" value={newWorkout.reps} onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"/>
          <input type="number" placeholder="Weight (kg)" value={newWorkout.weight} onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"/>
          <input type="text" placeholder="Duration (min)" value={newWorkout.duration} onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"/>
          <button type="submit" className="bg-[#39ff14] text-white font-semibold p-3 rounded-md col-span-2 hover:bg-[#2fd010] transition">Add Workout</button>
        </form>
      </div>
    </div>
  </div>
);

}
