import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HigherLowerBody from "../components/HigherLowerBody";
import { useQuery, useMutation } from "@apollo/client";
import { HERO_IMG, USER_HIGHSCORE } from "../utils/queries";
import { UPDATE_HIGHSCORE } from "../utils/mutations";
import bgImage from "../images/battlegrounds-3.jpeg";

export default function HigherLower() {
  const [heroOneId, setHeroOneId] = useState(null);
  const [heroTwoId, setHeroTwoId] = useState(null);
  const [unseenIds, setUnseenIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [powerStat, setPowerStat] = useState("");
  const [highscore, setHighscore] = useState(0);
  
  const [updateHighScore] = useMutation(UPDATE_HIGHSCORE);
  
  const userHighScoreResult = useQuery(USER_HIGHSCORE);


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

  useEffect( () => {
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

      console.log();

      //Set the new unseenIds array
      setUnseenIds(ids);
  }, []);

  useEffect(() => {
    if (!gameOver) {
      setHeroTwoId(getRandomId(unseenIds));
      setPowerStat(getRandomPowerStat());
    }
  }, [unseenIds]);
  
  useEffect(() => {
    if (userHighScoreResult.data) {
      setHighscore(userHighScoreResult.data?.user?.higherLowerGameHighestScore);
    }
  }, [userHighScoreResult.data]);


  //On game over 
  useEffect(async () => {
    if(score > highscore && gameOver === true) {
      setHighscore(score);
      //Use mutation to update highscore in db
      await updateHighScore({
        variables: {
          streak: score
        },
      })
    } else if(gameOver === true && score <= highscore) {
      await updateHighScore({
        variables: {
          streak: highscore
        },
      })
    }
  }, [gameOver]);

  const handleAnswer = (answer) => {
    if (!powerStat || heroOneResults.loading || heroTwoResults.loading) {
      return; // Wait for the data to be loaded and powerStat to be set before processing the answer
    }

    const heroOnePowerStat = heroOneResults.data.hero.powerstats[powerStat];
    const heroTwoPowerStat = heroTwoResults.data.hero.powerstats[powerStat];

    const isCorrect =
      (answer === "higher" && heroTwoPowerStat >= heroOnePowerStat) ||
      (answer === "lower" && heroTwoPowerStat < heroOnePowerStat);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setHeroOneId(heroTwoId);
      setUnseenIds((prevIds) => prevIds.filter((id) => id !== heroTwoId));

      // Check if the current score is higher than the win streak
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

  const handleTryAgain = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div
      className="bg-cover bg-center pb-20"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="heading-3 text-3xl font-bold text-center pt-8 tracking-widest">
          Welcome to the Higher Lower Game!

        </h1>
        {gameOver ? (
          <div className="mt-8 text-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl">Your score: {score}</p>
            <div className="justify-center mt-4 space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={handleTryAgain}
              >
                Try Again
              </button>
              <Link
                to="/"
                className="px-4 py-2 bg-gray-500 font-bold text-white rounded"
              >
                Go Back to Main Menu
              </Link>
            </div>
          </div>
        ) : (
          <HigherLowerBody
            heroOneId={heroOneId}
            heroTwoId={heroTwoId}
            heroOneResults={heroOneResults}
            heroTwoResults={heroTwoResults}
            powerStat={powerStat}
            score={score}
            highscore={highscore}
            handleAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}
