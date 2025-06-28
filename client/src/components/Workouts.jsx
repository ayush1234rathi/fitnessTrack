import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutList from "./Workouts/WorkoutList";
import WorkoutForm from "./Workouts/WorkoutForm";
import WorkoutSummary from "./Workouts/WorkoutSummary";
import WorkoutDatePicker from "./Workouts/WorkoutDatePicker";
import AlertMessage from "./AlertMessage";

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

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-background"><span className="text-lg text-accent animate-pulse">Loading...</span></div>;
  if (error) return <AlertMessage type="error" message={error} className="mx-auto max-w-lg" />;

  return (
    <div className="bg-background min-h-screen py-8 px-2 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8">
        <WorkoutDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-accent mb-6 text-center tracking-widest uppercase drop-shadow-lg">Workout Tracker</h1>
            <h2 className="text-xl font-display text-accent mb-4 uppercase tracking-widest">Today's Workouts</h2>
            <WorkoutList workouts={workouts} onDelete={handleDelete} onToggleDone={handleToggleDone} />
            <WorkoutSummary totalCaloriesBurned={totalCaloriesBurned} />
          </div>
          <WorkoutForm newWorkout={newWorkout} setNewWorkout={setNewWorkout} handleSubmit={handleSubmit} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
