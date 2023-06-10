import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import { useQuery} from "@apollo/client";
import { USER_DATA } from "../utils/queries";
import bgImage from "../images/battlegrounds-14.jpeg";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";




export default function YourProfile() {
  const [userData, setUserData] = useState({
    
      me: {
        username: "Loading",
        higherLowerGamesPlayed: 0,
        higherLowerGameHighestScore: 0,
        draftGamesPlayed: 0,
        draftGameWins: 0,
        draftGameLosses: 0
      }
    
  })

  const { loading, data } = useQuery(USER_DATA)

  useEffect(() => {
  
  }, [])
  useEffect(() => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        ...data
      }
    })
  }, [data])
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <h1 className="text-3xl font-bold text-center pt-20 sh-background-1">

      </h1>
      <Profile 
      userData = {userData}
      />
    </div>
  );
};
