import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WorkoutList from "./Workouts/WorkoutList";
import WorkoutForm from "./Workouts/WorkoutForm";
import WorkoutSummary from "./Workouts/WorkoutSummary";
import WorkoutDatePicker from "./Workouts/WorkoutDatePicker";
import AlertMessage from "./AlertMessage";
import Loading from "./Loading";

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
  const [loadingIds, setLoadingIds] = useState([]);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, [selectedDate]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      // Always send date as yyyy-mm-dd (no time part)
      const response = await axios.get(`https://fitness-server-0bzg.onrender.com/api/v1/workout/getWorkoutsByDate?date=${selectedDate}`, {
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
    // const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let dates = [];
    for (let d = new Date(date); d <= lastDay; d.setDate(d.getDate() + 1)) {
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
      const today = new Date();
      today.setHours(0,0,0,0);
      if (newWorkout.dayOfWeek) {
        dates = getAllDatesForDayOfWeek(selectedDate, newWorkout.dayOfWeek).filter(dateStr => {
          const [yyyy, mm, dd] = dateStr.split('-');
          const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
          d.setHours(0,0,0,0);
          return d >= today;
        });
        if (dates.length === 0) {
          setError("Cannot add workout to past dates. Please select today or a future date.");
          setLoading(false);
          return;
        }
      } else {
        const selected = new Date(selectedDate);
        selected.setHours(0,0,0,0);
        // if (selected < today) {
        //   setError("Cannot add workout to a past date. Please select today or a future date.");
        //   setLoading(false);
        //   return;
        // }
        dates = [selectedDate];
      }
      await axios.post(
        "https://fitness-server-0bzg.onrender.com/api/v1/workout/add",
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
      // Check for Gemini error
      if (err.response && err.response.data && err.response.data.message === "unable to connect") {
        setPopup("unable to connect");
      } else {
        setError("Failed to add workout");
      }
      console.error("Error adding workout:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (id) => {
    setLoadingIds((ids) => [...ids, id]);
    try {
      await axios.delete(`https://fitness-server-0bzg.onrender.com/api/v1/workout/delete/${id}`, {
        withCredentials: true,
      });
      setWorkouts((prev) => prev.filter(w => w._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete workout");
      console.error("Error deleting workout:", err);
    } finally {
      setLoadingIds((ids) => ids.filter((loadingId) => loadingId !== id));
    }
  }, []);

  const handleToggleDone = useCallback(async (id) => {
    setLoadingIds((ids) => [...ids, id]);
    try {
      await axios.patch(`https://fitness-server-0bzg.onrender.com/api/v1/workout/toggleDone/${id}`, {}, {
        withCredentials: true,
      });
      setWorkouts((prev) => prev.map(w => w._id === id ? { ...w, done: !w.done } : w));
      setError("");
    } catch (err) {
      setError("Failed to update workout status");
      console.error("Error toggling done status:", err);
    } finally {
      setLoadingIds((ids) => ids.filter((loadingId) => loadingId !== id));
    }
  }, []);

  // Calculate total calories for done workouts only
  const totalCaloriesBurned = workouts.reduce((sum, w) => w.done ? sum + (w.caloriesBurned || 0) : sum, 0);

  if (loading) return <Loading message="Loading workouts..." />;
  if (error) return <AlertMessage type="error" message={error} className="mx-auto max-w-lg" />;

  return (
    <div className="min-h-screen py-8 px-2 flex justify-center">
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-primary rounded-xl shadow-2xl p-8 flex flex-col items-center">
            <span className="text-xl text-red-600 font-bold mb-4">{popup}</span>
            <button
              className="bg-primary text-background px-6 py-2 rounded-lg font-bold mt-2"
              onClick={() => setPopup("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8">
        <WorkoutDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-accent mb-6 text-center tracking-widest uppercase drop-shadow-lg">Workout Tracker</h1>
            <h2 className="text-xl font-display text-accent mb-4 uppercase tracking-widest">Today's Workouts</h2>
            <WorkoutList workouts={workouts} onDelete={handleDelete} onToggleDone={handleToggleDone} loadingIds={loadingIds} />
            <WorkoutSummary totalCaloriesBurned={totalCaloriesBurned} />
          </div>
          <WorkoutForm newWorkout={newWorkout} setNewWorkout={setNewWorkout} handleSubmit={handleSubmit} loading={loading} error={error} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}
