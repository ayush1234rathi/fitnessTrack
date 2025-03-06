import React, { useState, useEffect } from "react";
import Card from "./DashBoard/Card";
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
import { useWorkoutstore } from "../store/useWorkoutStore";
import { counts } from "../utils/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export default function Dashboard() {
  const { getWorkout, dashboardData, gettingDashboard } = useWorkoutstore();
  const [workoutData, setWorkoutData] = useState([4, 3, 2, 6]);

  if (gettingDashboard && !workoutData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TbLoader3 className="animate-spin" size={45} />
      </div>
    );
  }

  useEffect(() => {
    getWorkout();
  }, [getWorkout]);

  console.log(dashboardData?.totalWeeksCaloriesBurnt?.weeks);

  const barData = {
    labels: dashboardData?.totalWeeksCaloriesBurnt?.weeks,
    datasets: [
      {
        label: "Calories Burned",
        data: dashboardData?.totalWeeksCaloriesBurnt?.caloriesBurned,
        backgroundColor: "#39ff14",
        borderColor: "#39ff14",
        borderWidth: 1,
      },
    ],
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const pieData = {
    labels: dashboardData?.pieChartData.map((item) => item.label),
    datasets: [
      {
        label: "Workout Breakdown by Category",
        data: dashboardData?.pieChartData.map((item) => item.value),
        backgroundColor: dashboardData?.pieChartData?.map(() =>
          generateRandomColor()
        ),
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

  return (
    <div className="bg-gray-100 min-h-screen flex grow mx-auto w-full md:max-w-6xl max-w-sm my-2 rounded-xl overflow-hidden">
      <div className="bg-white shadow-lg border border-gray-200 w-full p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {counts.map((item, idx) => {
            return <Card item={item} data={dashboardData} key={idx} />;
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300 max-h-full flex justify-center flex-col items-center">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">
              Calories Burned (Last 7 Days)
            </h2>
            <Bar
              data={barData}
              options={{ responsive: true, maintainAspectRatio: true }}
            />
          </div>

          <div className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-300 flex justify-center flex-col items-center">
            <h2 className="text-lg font-semibold mb-3 text-blue-600">
              Workout Breakdown
            </h2>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
