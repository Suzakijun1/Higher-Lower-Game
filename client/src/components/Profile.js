import React from "react";
import { Link } from "react-router-dom";
//import soundFx from "../sounds/080953_semi-auto-pistol-39750.wav";

const Profile = ({userData}) => {
  const playSound = () => {
    new Audio(soundFx).play();
  };
  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <div className="p-6 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-400 w-80 shadow-xl shadow-blue-500/70 ">
        <h1 className="text-2xl font-bold mb-4 text-center underline">{userData.me.username}'s Stats:</h1>
        <div className="flex flex-col gap-4 px-10">
          <h1 className="text-xl font-bold mb-4 text-center">Draft Games Played: {userData.me.draftGamesPlayed}</h1>
          <h1 className="text-xl font-bold mb-4 text-center">Draft Game Wins: {userData.me.draftGameWins}</h1>
          <h1 className="text-xl font-bold mb-4 text-center">Draft Game Losses: {userData.me.draftGameLosses}</h1>
          <h1 className="text-xl font-bold mb-4 text-center">Lower Higher Games Played: {userData.me.higherLowerGamesPlayed}</h1>
          <h1 className="text-xl font-bold mb-4 text-center">Lower Higher Highscore: {userData.me.higherLowerGameHighestScore}</h1>
         </div>

      </div>
    </div>
  );
};

export default Profile;
