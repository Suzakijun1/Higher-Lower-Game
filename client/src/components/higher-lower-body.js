import { HERO_IMG } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const HigherLowerBody = () => {
  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      {/* HEADING */}
      <h1 className="text-2xl font-bold mb-4">Pick One</h1>

      <div className="flex gap-6 mt-4">
        {/* Left Superhero/Villain Card - Will hold image*/}
      </div>
    </div>
  );
};
export default HigherLowerBody;
