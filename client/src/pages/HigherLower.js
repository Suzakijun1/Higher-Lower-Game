import { useEffect, useState } from "react";
import HigherLowerBody from "../components/HigherLowerBody";
import { useQuery } from "@apollo/client";
import { HERO_IMG } from "../utils/queries";

export default function HigherLower() {
  const [heroOneId, setHeroOneId] = useState(null);
  const [heroTwoId, setHeroTwoId] = useState(null);
  const [unseenIds, setUnseenIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [powerStat, setPowerStat] = useState("");

  const heroOneResults = useQuery(HERO_IMG, {
    variables: {
      heroId: heroOneId + "",
    },
  });
  const heroTwoResults = useQuery(HERO_IMG, {
    variables: {
      heroId: heroTwoId + "",
    },
  });

  useEffect(() => {
    const initializeGame = async () => {
      //Create an array of all possible ids
      let ids = [];
      for (let i = 1; i < 732; i++) {
        ids.push(i);
      }

      //Set Hero One Id to a valid random id
      const randomHeroOneId = Math.floor(Math.random() * 730 + 1);
      setHeroOneId(randomHeroOneId);

      //Remove the id generated from the unseenIds array
      ids = ids.filter((id) => id !== randomHeroOneId);

      //Using the unseenIds array get a random ids from it
      const randomHeroTwoId = ids[Math.floor(Math.random() * ids.length)];

      setHeroTwoId(randomHeroTwoId);

      //Filter the new id out of the unseenIds
      ids = ids.filter((id) => id !== randomHeroTwoId);

      //Set the new unseenIds array
      setUnseenIds(ids);
    };
    initializeGame();
  }, []);
  useEffect(() => {
    if (!gameOver) {
      setHeroTwoId(getRandomId(unseenIds));
      setPowerStat(getRandomPowerStat());
    }
  }, [unseenIds]);

  const handleAnswer = (answer) => {
    if (!powerStat || heroOneResults.loading || heroTwoResults.loading) {
      return; // Wait for the data to be loaded and powerStat to be set before processing the answer
    }

    const heroOnePowerStat = heroOneResults.data.hero.powerstats[powerStat];
    const heroTwoPowerStat = heroTwoResults.data.hero.powerstats[powerStat];

    const isCorrect =
      (answer === "higher" && heroTwoPowerStat > heroOnePowerStat) ||
      (answer === "lower" && heroTwoPowerStat < heroOnePowerStat);

    if (isCorrect) {
      setScore(score + 1);
      setHeroOneId(heroTwoId);
      setUnseenIds((prevIds) => prevIds.filter((id) => id !== heroTwoId));
    } else {
      setGameOver(true);
    }
  };

  const getRandomId = (ids) => {
    const randomIndex = Math.floor(Math.random() * ids.length);
    return ids[randomIndex];
  };
  const getRandomPowerStat = () => {
    const powerStats = ["intelligence", "strength", "speed", "durability"];
    const randomIndex = Math.floor(Math.random() * powerStats.length);
    return powerStats[randomIndex];
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">
        Welcome to the Higher Lower Game!
      </h1>
      {gameOver ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl">Your score: {score}</p>
        </div>
      ) : (
        <HigherLowerBody
          heroOneId={heroOneId}
          heroTwoId={heroTwoId}
          heroOneResults={heroOneResults}
          heroTwoResults={heroTwoResults}
          powerStat={powerStat}
          score={score}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
