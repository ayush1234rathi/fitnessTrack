import React from "react";
import { Line } from "react-chartjs-2";

const DashboardChart = React.memo(({ chartData, chartOptions }) => (
  <div className="bg-card p-8 rounded-xl shadow-xl border-2 border-primary ">
    <Line data={chartData} options={chartOptions} />
  </div>
));

export default DashboardChart; 