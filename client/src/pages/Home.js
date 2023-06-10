import React, { useEffect } from "react";
import GameModesComponent from "../components/GameMode";
import Footer from "../components/Footer";
import bgImage from "../images/battlegrounds-1.jpeg";
import { useQuery } from "@apollo/client";
import { USER_DATA } from "../utils/queries";


export default function Home() {
  const {loading, data} = useQuery(USER_DATA)

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div
      className="bg-cover bg-center tracking-widest"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <h1 className="heading-2 text-3xl font-bold text-center pt-20 sh-background-1">
        Welcome to the Game!
      </h1>
      <GameModesComponent />
    </div>
  );
};
