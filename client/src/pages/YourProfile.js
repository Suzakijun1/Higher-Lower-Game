import React from "react";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import bgImage from "../images/battlegrounds-14.jpeg";



export default function Home() {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <h1 className="text-3xl font-bold text-center pt-20 sh-background-1">
        Your Stats
      </h1>
      <Profile />
    </div>
  );
};
