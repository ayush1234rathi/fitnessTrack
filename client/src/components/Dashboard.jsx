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
    // This will be removed once we fetch real data
    const fetchWorkoutData = () => {
      // Mock workout data for the last 7 days and body part categories
      const dailyWorkouts = {
        "Abs": 4,
        "Shoulder": 3,
        "Leg": 2,
        "Back": 6,
      };

      // Mock calories burned for the last 7 days
      const dailyCalories = [500, 700, 600, 550, 450, 480, 700]; // Calories burned for each day

      setWorkoutData([dailyWorkouts["Abs"], dailyWorkouts["Shoulder"], dailyWorkouts["Leg"], dailyWorkouts["Back"]]);
      setCaloriesBurned(dailyCalories);
    };

    fetchWorkoutData(); // Calling the mock function
  }, []);

  // Bar chart data for calories burned
  const barData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesBurned,
        backgroundColor: "#FF6384", // Red for Calories
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data for body parts worked on (Abs, Shoulder, Leg, Back)
  const pieData = {
    labels: ["Abs", "Shoulder", "Leg", "Back"],
    datasets: [
      {
        label: "Workout Breakdown by Category",
        data: workoutData,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", // Custom colors for the categories
        ],
        hoverOffset: 5,
      },
    ],
  };

  // Pie chart options for donut chart
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
    rotation: -0.7, // Rotation to make it look better
    cutout: "70%", // This creates a donut chart effect (you can adjust this percentage)
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
  <div className="grow m-6 md:mx-20 bg-gray-100 p-6 rounded-lg shadow-lg">
    <h1 className="font-bold text-4xl text-gray-800 mb-6">Dashboard</h1>

    {/* Statistics Cards */}
    <div className="flex flex-wrap gap-6">
      <CalorieCard title="Total Calories Burned" value={caloriesBurned.reduce((a, b) => a + b, 0)} />
    </div>

    {/* Charts Section */}
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:gap-6 mt-6">
      {/* Bar Chart for Calories Burned */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Calories Burned (Last 7 Days)</h2>
        <Bar data={barData} options={{ responsive: true }} />
      </div>

      {/* Donut Pie Chart for Body Part Breakdown */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow-md rounded-lg flex justify-center">
        <h2 className="absolute mt-4 text-lg font-semibold text-gray-700">Workout Breakdown</h2>
        <Pie data={pieData} options={pieOptions} />
      </div>

    {/* Notes Section */}
    <div className="mt-6 bg-white p-6 md:w-1/3 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Notes</h2>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add your notes here..."
        className="w-full h-40 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    </div>

  </div>
);

}
