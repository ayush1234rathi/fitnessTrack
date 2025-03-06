import React from "react";

const Card = ({item, data}) => {
  return (
    <div className="card flex px-4 my-4 mx-2 justify-center flex-col rounded-lg border border-gray-300 shadow-md bg-white sm:h-32 sm:w-80 h-36 w-full">
      <p className="text-lg font-semibold text-blue-600">{item.name}</p>
      <p className="font-medium sm:text-4xl text-2xl text-gray-800">
        {data && data[item.key].toFixed(2)} <span className="sm:text-base text-sm  text-green-600">{item.unit}</span>
      </p>
      <p className="">{item.desc}</p>
    </div>
  );
};

export default Card;