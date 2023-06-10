import React from "react";
import { Link } from "react-router-dom";
//import soundFx from "../sounds/080953_semi-auto-pistol-39750.wav";

const Profile = () => {
  const playSound = () => {
    new Audio(soundFx).play();
  };
  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <div className="p-6 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-400 w-80 shadow-xl shadow-blue-500/70 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Stats</h1>
      </div>
    </div>
  );
};

export default Profile;
