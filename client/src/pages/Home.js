import React from "react";

import GameModesComponent from "../components/game-mode";
import Footer from "../components/footer";



export default function Home() {
  return (
    <div style={{ backgroundImage: "url()" }}>
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the Game!
      </h1>
      <GameModesComponent />
      <Footer />
    </div>
  );
};
