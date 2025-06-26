import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import workoutService from "../services/workout.service";
import AlertMessage from "./AlertMessage";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCaloriesBurnt: 0,
    totalWorkouts: 0,
    avgCaloriesBurntPerWorkout: 0,
    totalWeeksCaloriesBurnt: {
      weeks: [],
      caloriesBurned: [],
    },
    pieChartData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await workoutService.getDashboardStats();
      setStats({
        totalCaloriesBurnt: data.totalCaloriesBurnt || 0,
        totalWorkouts: data.totalWorkouts || 0,
        avgCaloriesBurntPerWorkout: data.avgCaloriesBurntPerWorkout || 0,
        totalWeeksCaloriesBurnt: {
          weeks: data.totalWeeksCaloriesBurnt?.weeks || [],
          caloriesBurned: data.totalWeeksCaloriesBurnt?.caloriesBurned || [],
        },
        pieChartData: data.pieChartData || [],
      });
      setError("");
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Set up auto-refresh every 10 seconds
    // const interval = setInterval(fetchDashboardData, 10000);
    // return () => clearInterval(interval);
  }, [setStats]);

  const chartData = {
    labels: stats.totalWeeksCaloriesBurnt.weeks,
    datasets: [
      {
        label: "Calories Burned",
        data: stats.totalWeeksCaloriesBurnt.caloriesBurned,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Calories Burned",
      },
    },
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100"><span className="text-lg text-gray-600 animate-pulse">Loading...</span></div>;
  if (error) return <AlertMessage type="error" message={error} className="mx-auto max-w-lg" />;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-500 mb-1 uppercase tracking-wide">Total Calories Burned</h2>
            <p className="text-4xl font-extrabold text-blue-600">{stats.totalCaloriesBurnt} kcal</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-500 mb-1 uppercase tracking-wide">Total Workouts</h2>
            <p className="text-4xl font-extrabold text-green-600">{stats.totalWorkouts}</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-500 mb-1 uppercase tracking-wide">Avg Calories/Workout</h2>
            <p className="text-4xl font-extrabold text-purple-600">
              {Math.round(stats.avgCaloriesBurntPerWorkout)} kcal
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border mb-8">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border">
            <h2 className="text-lg font-semibold text-gray-500 mb-4 uppercase tracking-wide">Workout Categories</h2>
            <div className="space-y-2">
              {stats.pieChartData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{category.label}</span>
                  <span className="font-semibold">{category.value} kcal</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border">
            <h2 className="text-lg font-semibold text-gray-500 mb-4 uppercase tracking-wide">Recent Achievements</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="mr-2">🏆</span>
                {stats.totalWorkouts} workouts completed this week
              </li>
              <li className="flex items-center text-gray-600">
                <span className="mr-2">🔥</span>
                {stats.totalCaloriesBurnt} calories burned in total
              </li>
              <li className="flex items-center text-gray-600">
                <span className="mr-2">💪</span>
                Average of {Math.round(stats.avgCaloriesBurntPerWorkout)} calories per workout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
