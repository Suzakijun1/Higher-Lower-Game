import {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import DraftBody from "../components/draft-game-body";
import NavBar from "../components/navbar";
import {HERO_IMG} from "../utils/queries"

export default function Home() {
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [seenIds, setSeenIds] = useState([])
  const [isDrafting, setIsDrafting] = useState(true);
  const [heroOneId, setHeroOneId] = useState(Math.floor(Math.random() * 730 + 1));
  const [heroTwoId, setHeroTwoId] = useState(() => {
    let newId;
    while(true){
      newId = Math.floor(Math.random() * 730 + 1)
      if(newId !== heroOneId){
        break
      }
    }
    return newId;
  });
  

  return (
    <div>
      
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the Game!
      </h1>
      <DraftBody 
      heroOneId={heroOneId}
      heroTwoId={heroTwoId}
      setHeroOneId={setHeroOneId}
      setHeroTwoId={setHeroTwoId}
      teamOne={teamOne}
      teamTwo={teamTwo}
      setTeamOne={setTeamOne}
      setTeamTwo={setTeamTwo}
      setIsDrafting={setIsDrafting}
      />
    </div>
  );
}
