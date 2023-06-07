import {useEffect, useState} from "react";
import DraftBody from "../components/draft-game-body";
import NavBar from "../components/navbar";

export default function Home() {
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [isDrafting, setIsDrafting] = useState(true);


  useEffect(() => {
    
  }, [])
  

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the Game!
      </h1>
      <DraftBody />
    </div>
  );
}
