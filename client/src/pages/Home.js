import React from "react";
import GameModesComponent from "../components/GameMode";
import Footer from "../components/Footer";
import bgImage from "../images/battlegrounds-1.jpeg";



export default function Home() {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <h1 className="text-3xl font-bold text-center pt-10 sh-background-1">
        Welcome to the Game!
      </h1>
      <GameModesComponent />
      <Footer />
    </div>
  );
};
