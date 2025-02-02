import React from "react";

const CalorieCard = () => {
  return (
    <div className="card flex px-4 my-4 mx-2 justify-center flex-col rounded-lg border border-gray-300 shadow-md bg-white sm:h-32 sm:w-96 h-36 w-full">
      <p className="text-blue-700 font-semibold sm:text-xl text-lg">Calories Burned</p>
      <p className="font-medium sm:text-4xl text-2xl text-gray-800">
        12000.00 <span className="sm:text-base text-sm  text-green-600">kcal</span>
      </p>
      <p className="font-normal">Total calories burned today</p>
    </div>
  );
};

export default CalorieCard;
