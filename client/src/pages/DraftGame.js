import {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import DraftBody from "../components/draft-game-body";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import {HERO_IMG} from "../utils/queries"

export default function Home() {
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [isDrafting, setIsDrafting] = useState(true);
  const [heroOneId, setHeroOneId] = useState(0);
  const [heroTwoId, setHeroTwoId] = useState(0);
  const [unseenIds, setUnseenIds] = useState([]);
  

  useEffect(async () => {
    //Create an array of all possible ids
    let ids =[]; 
    for(let i = 1; i < 732; i++){
      ids.push(i);
    }

    //Set Hero One Id to a valid random id 
    setHeroOneId(Math.floor(Math.random() * 730 + 1))
    
    //Remove the id generated from the unseenIds array
    ids = ids.filter(id => id !== heroOneId);
    
    //Using the unseenIds array get a random ids from it
    let newHeroTwoId = ids[Math.floor(Math.random() * ids.length)]
    
    //Set the aforementioned value to heroTwoId
    setHeroTwoId(newHeroTwoId)

    //Filter the new id out of the unseenIds
    ids = ids.filter(id => id !== heroTwoId);

    //Set the new unseenIds array
    setUnseenIds(ids);
  }, [])

  useEffect(()=>{
    console.log(heroOneId)
    console.log(heroTwoId)
    console.log(unseenIds)
  },[unseenIds])

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
      unseenIds={unseenIds}
      setUnseenIds={setUnseenIds}
      setTeamOne={setTeamOne}
      setTeamTwo={setTeamTwo}
      setIsDrafting={setIsDrafting}
      />
      <Footer />
    </div>
  );
}