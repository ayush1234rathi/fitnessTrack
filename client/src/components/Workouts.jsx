import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";

const Workouts = () => {
  const { addWorkout, getWorkoutByDate, workouts, loading } = useUserStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [workout, setWorkout] = useState({
    category: "",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getWorkoutByDate(selectedDate);
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (workout.workoutName.trim() === "") {
      toast.error("Fill the workout name");
      return;
    }

    if (workout.category.trim() === "") {
      toast.error("Fill the category");
      return;
    }
    if (workout.sets.trim() === "") {
      toast.error("Fill the sets");
      return;
    }
    if (workout.reps.trim() === "") {
      toast.error("Fill the reps");
      return;
    }
    if (workout.weight.trim() === "") {
      toast.error("Fill the weight");
      return;
    }
    if (workout.duration.trim() === "") {
      toast.error("Fill the duration");
      return;
    }
    console.log(workout);
    addWorkout(workout);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex grow mx-auto w-full max-w-6xl my-2 rounded-xl overflow-hidden">
      <div className="bg-white shadow-lg p-4 border border-gray-200 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Workout Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="bg-gray-50 shadow-md rounded-lg p-5 border border-gray-300">
            <h2 className="text-lg font-semibold mb-2 text-blue-600">
              Select Date
            </h2>
            <input
              type="date"
              value={workout.date}
              onChange={(e) => {
                setWorkout({ ...workout, date: e.target.value });
                setSelectedDate(e.target.value);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Workouts Display */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Today's Workouts
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {workouts && workouts.todaysWorkouts ? (
                workouts.todaysWorkouts.map((workout) => (
                  <div
                    key={workout._id}
                    className="bg-gray-50 shadow-md rounded-lg p-4 border-l-4 border-[#39ff14] hover:scale-105 transition-transform duration-200"
                  >
                    <span className="text-[#39ff14] text-sm font-semibold">
                      #{workout.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {workout.workoutName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Count: {workout.sets} sets X {workout.reps} reps
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <span className="mr-4">🏋️ {workout.weight} kg</span>
                      <span>⏳ {workout.duration}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No workouts available for the selected date.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Add Workout Form */}
        <div className="mt-6 bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Workout
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Workout Name"
              value={workout.workoutName}
              onChange={(e) =>
                setWorkout({ ...workout, workoutName: e.target.value })
              }
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              placeholder="Category"
              value={workout.category}
              onChange={(e) =>
                setWorkout({ ...workout, category: e.target.value })
              }
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="number"
              placeholder="Sets"
              value={workout.sets}
              onChange={(e) => setWorkout({ ...workout, sets: e.target.value })}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="number"
              placeholder="Reps"
              value={workout.reps}
              onChange={(e) => setWorkout({ ...workout, reps: e.target.value })}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={workout.weight}
              onChange={(e) =>
                setWorkout({ ...workout, weight: e.target.value })
              }
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              placeholder="Duration (min)"
              value={workout.duration}
              onChange={(e) =>
                setWorkout({ ...workout, duration: e.target.value })
              }
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="submit"
              className="bg-[#39ff14] text-white font-semibold p-3 rounded-md col-span-2 hover:bg-[#2fd010] transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <TbLoader3 className="animate-spin" />
                  Logging in
                </>
              ) : (
                "Add Workout"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
