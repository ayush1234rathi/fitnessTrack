import React, { useState, useEffect } from "react";
import StatCard from "./DashBoard/StatCard";
import DashboardChart from "./DashBoard/DashboardChart";
import CategoryList from "./DashBoard/CategoryList";
import AchievementList from "./DashBoard/AchievementList";
import workoutService from "../services/workout.service";
import AlertMessage from "./AlertMessage";
import Loading from "./Loading";
// import img4 from './../assets/img4.jpeg';
import img4 from './../assets/img4.jpg';

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
        color: '#FFEB3B',
        font: { family: 'Oswald', size: 20, weight: 'bold' }
      },
    },
    scales: {
      x: { ticks: { color: '#FFEB3B' } },
      y: { ticks: { color: '#FFEB3B' } }
    }
  };  

  if (loading) return <Loading message="Loading dashboard..." />;
  if (error) return <AlertMessage type="error" message={error} className="mx-auto max-w-lg" />;

  return (
    <div className="min-h-full py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-extrabold text-accent mb-8 text-center tracking-widest uppercase drop-shadow-lg">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <StatCard label="Total Calories Burned" value={`${stats.totalCaloriesBurnt} kcal`} colorClass="text-accent" />
          <StatCard label="Total Workouts" value={stats.totalWorkouts} colorClass="text-accent" />
          <StatCard label="Avg Calories/Workout" value={`${Math.round(stats.avgCaloriesBurntPerWorkout)} kcal`} colorClass="text-accent" />
        </div>
        <DashboardChart chartData={chartData} chartOptions={chartOptions} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <CategoryList pieChartData={stats.pieChartData} />
          <AchievementList stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
