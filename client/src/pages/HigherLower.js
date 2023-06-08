import { useEffect, useState } from "react";
import HigherLowerBody from "../components/HigherLowerBody";
import { useQuery, useMutation } from "@apollo/client";
import { HERO_IMG, USER_HIGHSCORE} from "../utils/queries";
import { UPDATE_HIGH_SCORE} from "../utils/mutations";

export default function HigherLower() {
  const [heroOneId, setHeroOneId] = useState(null);
  const [heroTwoId, setHeroTwoId] = useState(null);
  const [unseenIds, setUnseenIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [powerStat, setPowerStat] = useState("");
  const [winStreak, setWinStreak] = useState(0);

  const userHighScoreResult = useQuery(USER_HIGHSCORE, {
    variables : {
      username : "testing1234"
    }
  });
  const [updateHighScore] = useMutation(UPDATE_HIGH_SCORE);

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

      console.log()

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
      setScore((prevScore) => prevScore + 1);
      setHeroOneId(heroTwoId);
      setUnseenIds((prevIds) => prevIds.filter((id) => id !== heroTwoId));

      // Check if the current score is higher than the win streak
      setWinStreak((prevWinStreak) => {
        const newWinStreak =
          score + 1 > prevWinStreak ? score + 1 : prevWinStreak;
        updateHighScore({
          variables: {
            highScore: newWinStreak,
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        return newWinStreak;
      });
    } else {
      setGameOver(true);
      if (score > winStreak) {
        setWinStreak(score); // Update the win streak if the current score is higher
      }
      setWinStreak(0); // Reset the win streak
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
      {userHighScoreResult.loading ? <div>Loading</div> : <div>{userHighScoreResult.data?.user?.higherLowerGameHighestScore}</div>}
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
          winStreak={winStreak}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
