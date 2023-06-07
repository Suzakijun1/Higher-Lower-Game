import {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import DraftBody from "../components/draft-game-body";
import NavBar from "../components/navbar";
import {HERO_IMG} from "../utils/queries"

export default function Home() {
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [isDrafting, setIsDrafting] = useState(true);
  const [heroOneId, setHeroOneId] = useState(Math.floor(Math.random() * 730 + 1));
  const [heroTwoId, setHeroTwoId] = useState(Math.floor(Math.random() * 730 + 1));
  
  

  

  return (
    <div>
      
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the Game!
      </h1>
      <DraftBody 
      heroOneId={heroOneId}
      heroTwoId={heroTwoId}
      />
    </div>
  );
}
