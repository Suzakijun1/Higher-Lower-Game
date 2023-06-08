import React from "react";
import { Link } from "react-router-dom";

const GameModesComponent = () => {
  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <div className="bg-gray-200 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Game Modes</h1>
        <div className="flex flex-col gap-4">
          <Link
            to="/draftgame"
            className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded"
          >
            Draft
          </Link>

          <Link
            to="/higherlower"
            className="bg-green-500 hover:bg-green-700 text-center text-white font-bold py-2 px-4 rounded"
          >
            Higher/Lower
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameModesComponent;