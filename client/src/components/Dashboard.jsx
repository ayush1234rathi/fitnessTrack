import React, { useState, useEffect } from "react";
import CalorieCard from "./DashBoard/CalorieCard";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to get last 7 days
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
  }
  return days;
};

export default function Dashboard() {
  const [workoutData, setWorkoutData] = useState([4, 3, 2, 6]); // Mock data for Abs, Shoulder, Leg, Back
  const [caloriesBurned, setCaloriesBurned] = useState([500, 700, 600, 550, 450, 480, 700]); // Mock data for calories burned over the last 7 days
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchWorkoutData = () => {
      const dailyWorkouts = {
        "Abs": 4,
        "Shoulder": 3,
        "Leg": 2,
        "Back": 6,
      };

      const dailyCalories = [500, 700, 600, 550, 450, 480, 700];

      setWorkoutData([dailyWorkouts["Abs"], dailyWorkouts["Shoulder"], dailyWorkouts["Leg"], dailyWorkouts["Back"]]);
      setCaloriesBurned(dailyCalories);
    };

    fetchWorkoutData();
  }, []);

  const barData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesBurned,
        backgroundColor: "#39ff14",
        borderColor: "#39ff14",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Abs", "Shoulder", "Leg", "Back"],
    datasets: [
      {
        label: "Workout Breakdown by Category",
        data: workoutData,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        ],
        hoverOffset: 5,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + " workouts";
          },
        },
      },
    },
    rotation: -0.7,
    cutout: "70%",
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex grow mx-auto w-full max-w-6xl my-2 rounded-xl overflow-hidden">
      <div className="bg-white shadow-lg border border-gray-200 w-full p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CalorieCard title="Total Calories Burned" value={caloriesBurned.reduce((a, b) => a + b, 0)} />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">Calories Burned (Last 7 Days)</h2>
            <Bar data={barData} options={{ responsive: true }} className="h-full" />
          </div>
          <div className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300 flex justify-center">
            <h2 className="absolute mt-4 text-lg font-semibold text-gray-700">Workout Breakdown</h2>
            <Pie data={pieData} options={pieOptions} />
          </div>
          <div className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Notes</h2>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Add your notes here..."
              className="w-full h-40 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
