import React from "react";
import { Link } from "react-router-dom";

const GameModesComponent = () => {
  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <div className="p-6 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-400 w-80 shadow-xl shadow-blue-500/70 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Game Modes</h1>
        <div className="flex flex-col gap-4 px-10">
          <Link
            to="/draftgame"
            className="flex space-x-10 bg-blue-500 text-center text-white font-bold py-2 px-4 rounded items-center"
          >
            <img
              className="w-10 h-10 bg-gray-200 rounded-full"
              src="https://www.superherodb.com/pictures2/portraits/10/100/85.jpg"
              alt="Description of the image"
            />
            <span>Draft</span>
          </Link>

          <Link
            to="/higherlower"
            className="flex space-x-10 bg-green-500 text-center text-white font-bold py-2 px-4 mb-5 rounded"
          >
            <span className="ml-1 pt-2">Higher/Lower</span>
            <img
              className="w-10 h-10 bg-gray-200 rounded-full"
              src="https://www.superherodb.com/pictures2/portraits/10/100/842.jpg"
              alt="Description of the image"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameModesComponent;
