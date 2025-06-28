import React from "react";

const CategoryList = ({ pieChartData }) => (
  <div className="bg-card p-8 rounded-xl shadow-xl border-2 border-primary">
    <h2 className="text-lg font-display text-accent mb-4 uppercase tracking-widest">Workout Categories</h2>
    <div className="space-y-2">
      {pieChartData.map((category, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-text">{category.label}</span>
          <span className="font-semibold text-primary">{category.value} kcal</span>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryList; 