import React from "react";
import CalorieCard from "./DashBoard/CalorieCard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(
      date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );
  }
  return days;
};

export default function Dashboard() {
  const yAxisData = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 100)
  ); // Generate Random Data
  const maxValue = Math.max(...yAxisData) + 10; // Dynamic max with padding

  const data = {
    labels: getLast7Days(), // X-Axis (Last 7 Days)
    datasets: [
      {
        label: "Random Values",
        data: yAxisData, // Y-Axis Data
        backgroundColor: "#b5fe0e", // Light Blue Bars
        borderColor: "#b5fe0e",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Last 7 Days Data" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxValue, // Adjust max value as needed
      },
    },
  };

  return (
    <div className="grow m-3 mx-20">
      <h1 className="font-semibold text-3xl text-gray-800">Dashboard</h1>
      <div className="screen md:flex">
        <CalorieCard />
        <CalorieCard />
        <CalorieCard />
      </div>
      <div className="w-full max-w-[600px] h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
