import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertMessage from "./AlertMessage";
import Button from "./Button";
import { FiTrash2 } from "react-icons/fi";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    // Use local date only, no timezone offset adjustment
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [newWorkout, setNewWorkout] = useState({
    category: "",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    caloriesBurned: "",
    dayOfWeek: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, [selectedDate]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      // Always send date as yyyy-mm-dd (no time part)
      const response = await axios.get(`http://localhost:8000/api/v1/workout/getWorkoutsByDate?date=${selectedDate}`, {
        withCredentials: true
      });
      setWorkouts(response.data.todaysWorkouts);
      setError("");
    } catch (err) {
      setError("Failed to fetch workouts");
      console.error("Error fetching workouts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get all dates in the month for a given day of week
  function getAllDatesForDayOfWeek(selectedDate, dayOfWeek) {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayOfWeek);
    if (dayIndex === -1) return [];
    // Start from the 1st of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let dates = [];
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === dayIndex) {
        // Format as yyyy-mm-dd (local, no time part)
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        dates.push(`${yyyy}-${mm}-${dd}`);
      }
    }
    return dates;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let dates = [];
      if (newWorkout.dayOfWeek) {
        // Generate all dates for the selected day of week in the month
        dates = getAllDatesForDayOfWeek(selectedDate, newWorkout.dayOfWeek);
      } else {
        // Just use the selected date (no time part)
        dates = [selectedDate];
      }
      await axios.post(
        "http://localhost:8000/api/v1/workout/add",
        {
          ...newWorkout,
          dates,
        },
        {
          withCredentials: true,
        }
      );
      await fetchWorkouts();
      setNewWorkout({
        category: "",
        workoutName: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        caloriesBurned: "",
        dayOfWeek: "",
      });
      setError("");
    } catch (err) {
      setError("Failed to add workout");
      console.error("Error adding workout:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/v1/workout/delete/${id}`, {
        withCredentials: true,
      });
      await fetchWorkouts();
      setError("");
    } catch (err) {
      setError("Failed to delete workout");
      console.error("Error deleting workout:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDone = async (id) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:8000/api/v1/workout/toggleDone/${id}`, {}, {
        withCredentials: true,
      });
      await fetchWorkouts();
      setError("");
    } catch (err) {
      setError("Failed to update workout status");
      console.error("Error toggling done status:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total calories for done workouts only
  const totalCaloriesBurned = workouts.reduce((sum, w) => w.done ? sum + (w.caloriesBurned || 0) : sum, 0);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex grow mx-auto w-full max-w-6xl my-2 rounded-xl overflow-hidden">
      <div className="bg-white shadow-lg p-4 border border-gray-200 w-full">
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
                <div key={workout._id} className="relative bg-gray-50 shadow-md rounded-lg p-4 border-l-4 border-[#39ff14] hover:scale-105 transition-transform duration-200">
                  <button
                    type="button"
                    aria-label="Delete workout"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => handleDelete(workout._id)}
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                  <span className="text-[#39ff14] text-sm font-semibold">#{workout.category}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{workout.workoutName}</h3>
                  <p className="text-gray-600 text-sm">Count: {workout.sets} sets X {workout.reps} reps</p>
                  <div className="flex items-center text-gray-500 text-sm mt-2">
                    <span className="mr-4">🏋️ {workout.weight} kg</span>
                    <span>⏳ {workout.duration} min</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Calories Burned: {workout.caloriesBurned} kcal
                  </div>
                  <Button
                    type="button"
                    variant={workout.done ? "secondary" : "primary"}
                    className={`mt-2 w-full ${workout.done ? 'border border-green-500 text-green-700 bg-green-50 hover:bg-green-100' : ''}`}
                    onClick={() => handleToggleDone(workout._id)}
                  >
                    {workout.done ? "Done" : "Mark as Done"}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right font-semibold text-blue-700">
              Total Calories Burned (Done): {totalCaloriesBurned} kcal
            </div>
          </div>
        </div>

        {/* Add Workout Form */}
        <div className="mt-6 bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Workout</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <AlertMessage type="error" message={error} />
            <input type="text" placeholder="Workout Name" value={newWorkout.workoutName} onChange={(e) => setNewWorkout({ ...newWorkout, workoutName: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full" required/>
            <select
              value={newWorkout.category}
              onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Biceps">Biceps</option>
              <option value="Triceps">Triceps</option>
              <option value="Abs / Core">Abs / Core</option>
              <option value="Glutes">Glutes</option>
              <option value="Quads">Quads</option>
              <option value="Hamstrings">Hamstrings</option>
              <option value="Calves">Calves</option>
            </select>
            <select
              value={newWorkout.dayOfWeek}
              onChange={(e) => setNewWorkout({ ...newWorkout, dayOfWeek: e.target.value })}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">(Optional) Select Day of Week</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
            <input type="number" placeholder="Sets" value={newWorkout.sets} onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full" required/>
            <input type="number" placeholder="Reps" value={newWorkout.reps} onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full" required/>
            <input type="number" placeholder="Weight (kg)" value={newWorkout.weight} onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full" required/>
            <input type="number" placeholder="Duration (min)" value={newWorkout.duration} onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })} className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 w-full" required/>
            <Button type="submit" loading={loading} className="w-full">Add Workout</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
