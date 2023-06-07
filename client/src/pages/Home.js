import React from "react";
import GameModesComponent from "../components/game-mode";
import NavBar from "../components/navbar";



export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the Game!
      </h1>
      <GameModesComponent />
    </div>
  );
};

