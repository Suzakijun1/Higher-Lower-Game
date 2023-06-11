import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_DRAFT_GAME_STATS } from "../utils/mutations";
import { Link } from "react-router-dom";

export default function DraftBattleBody({ teamOne, teamTwo }) {
  //This will hold the mutation for the updating the db with the result of the game
  const [updateDraftGameStats] = useMutation(UPDATE_DRAFT_GAME_STATS);
  //Player One Object State
  const [currentAction, setCurrentAction] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [playerOne, setPlayerOne] = useState({
    name: "Player 1",
    health: 1,
    takeDmg: (dmg) => {
      setPlayerOne((prevPlayerOne) => {
        return {
          ...prevPlayerOne,
          health: prevPlayerOne.health - dmg,
        };
      });
    },
  });

  //Player Two Object State
  const [playerTwo, setPlayerTwo] = useState({
    name: "Player 2",
    health: 1,
    takeDmg: (dmg) => {
      setPlayerTwo((prevPlayerTwo) => {
        return {
          ...prevPlayerTwo,
          health: prevPlayerTwo.health - dmg,
        };
      });
    },
  });
  //This indicates whose turn to attack is
  const [playerTurn, setPlayerTurn] = useState(false);

  //Checks if you are in the process of using the prompt
  const [selectingPrompt, setSelectingPrompt] = useState(false);

  //Current Prompt Indicates the action that want to be taken once we decide on the heroes
  const [currentPrompt, setCurrentPrompt] = useState({
    generatePrompt: (actingPlayer, opposingPlayer) => {
      return "No Prompt";
    },
    generateButtonPrompt: (actingPlayer, opposingPlayer) => {
      return "No Prompt";
    },
    resolvePrompt: (actingPlayer, oposingPlayer, actingHero, opposingHero) => {
      return "No resolution";
    },
    type: "",
  });

  const [currentEnemyHero, setCurrentEnemyHero] = useState({
    data: {
      hero: {
        name: "",
        powerstats: {
          intelligence: "",
          strength: "",
          speed: "",
          durability: "",
        },
        image: {
          url: "",
        },
      },
    },
  });

  const battlePrompts = [
    {
      generatePrompt: (actingPlayer, opposingPlayer) => {
        setCurrentAction(`${actingPlayer} attempts to trick ${opposingPlayer}`);
      },
      generateButtonPrompt: (actingPlayer, opposingPlayer) => {
        return `${actingPlayer} attempts to trick ${opposingPlayer}`;
      },
      resolvePrompt: (
        actingPlayer,
        opposingPlayer,
        actingHero,
        opposingHero
      ) => {
        //This is parsing the int string into number for each hero
        let opposingHeroInt = Number(
          opposingHero.data.hero.powerstats.intelligence
        );
        let actingHeroInt = Number(
          actingHero.data.hero.powerstats.intelligence
        );
        //If the opposing hero matches or has greater int than the acting hero no health change occur
        if (opposingHeroInt >= actingHeroInt) {
          //Change Player Turn
          setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn);

          //If the computer attacke set the screen up for the player to select their attack
          if (actingPlayer.name === "Player 2")
            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt);

          //Display the counter text
          setCurrentAction(
            `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
          );
        } else {
          //Calculate damage done after the prompt
          let dmg = actingHeroInt - opposingHeroInt;

          //The opposing player takes the dmdg
          opposingPlayer.takeDmg(dmg);

          //Change Player Turn
          setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn);

          //If the computer attacke set the screen up for the player to select their attack
          if (actingPlayer.name === "Player 2")
            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt);

          //Set the text to display the dmg done
          setCurrentAction(
            `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
          );
        }
      },
      type: "int",
    },
    {
      generatePrompt: (actingPlayer, opposingPlayer) => {
        setCurrentAction(
          `${actingPlayer} is hurling a car at ${opposingPlayer}`
        );
      },
      generateButtonPrompt: (actingPlayer, opposingPlayer) => {
        return `${actingPlayer} is hurling a car at ${opposingPlayer}`;
      },
      resolvePrompt: (
        actingPlayer,
        opposingPlayer,
        actingHero,
        opposingHero
      ) => {
        //Check if damage is done
        let opposingHeroStr = Number(
          opposingHero.data.hero.powerstats.strength
        );
        let actingHeroStr = Number(actingHero.data.hero.powerstats.strength);
        if (opposingHeroStr >= actingHeroStr) {
          console.log("We DID IT!");
          setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn);
          if (actingPlayer.name === "Player 2")
            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt);
          setCurrentAction(
            `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
          );
          return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`;
        } else {
          //Calculate damage done after the prompt
          let dmg = actingHeroStr - opposingHeroStr;
          opposingPlayer.takeDmg(dmg);
          setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn);
          if (actingPlayer.name === "Player 2")
            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt);
          console.log("We DID IT!");
          setCurrentAction(
            `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
          );
          return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`;
        }
      },
      type: "str",
    },
    {
      generatePrompt: (actingPlayer, opposingPlayer) => {
        setCurrentAction(
          `${actingPlayer} runs circles around ${opposingPlayer}`
        );
      },
      generateButtonPrompt: (actingPlayer, opposingPlayer) => {
        return `${actingPlayer} runs circles around ${opposingPlayer}`;
      },
      resolvePrompt: (
        actingPlayer,
        opposingPlayer,
        actingHero,
        opposingHero
      ) => {
        //Check if damage is done
        let opposingHeroSpd = Number(opposingHero.data.hero.powerstats.speed);
        let actingHeroSpd = Number(actingHero.data.hero.powerstats.speed);
        if (opposingHeroSpd >= actingHeroSpd) {
          console.log("We DID IT!");
          setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn);
          if (actingPlayer.name === "Player 2")
            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt);
          setCurrentAction(
            `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
          );
          return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`;
        } else {
          //Calculate damage done after the prompt
          let dmg = actingHeroSpd - opposingHeroSpd;
          //After a delay set
          opposingPlayer.takeDmg(dmg);
          setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn);
          if (actingPlayer.name === "Player 2")
            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt);
          setCurrentAction(
            `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
          );
          return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`;
        }
      },
      type: "spd",
    },
  ];

  function getDur(total, heroResult) {
    let dur = heroResult.data.hero.powerstats.durability;
    if (dur === "null") {
      return total;
    }
    return total + Number(dur);
  }

  useEffect(() => {
    //Add the durability of all heroes to get health for the players
    let p1health = teamOne.reduce(getDur, 0);
    setPlayerOne({
      ...playerOne,
      health: 100,
    });
    let p2health = teamTwo.reduce(getDur, 0);
    setPlayerTwo({
      ...playerTwo,
      health: 100,
    });
    //Set the computers prompt to a random one
    setCurrentPrompt(
      battlePrompts[Math.floor(Math.random() * battlePrompts.length)]
    );
    setCurrentEnemyHero(() => {
      const newHero = {
        ...teamTwo[Math.floor(Math.random() * teamTwo.length)],
      };
      return newHero;
    });
  }, []);

  useEffect(() => {
    currentPrompt.generatePrompt(
      playerTurn ? playerOne.name : playerTwo.name,
      playerTurn ? playerTwo.name : playerOne.name
    );
    setCurrentEnemyHero(() => {
      const newHero = {
        ...teamTwo[Math.floor(Math.random() * teamTwo.length)],
      };
      return newHero;
    });
  }, [currentPrompt]);

  useEffect(() => {
    if (!playerTurn && playerTwo.health > 0) {
      console.log("I'm not dead yet");
      //Set the computers prompt to a random one
      setCurrentPrompt(
        battlePrompts[Math.floor(Math.random() * battlePrompts.length)]
      );
      setCurrentEnemyHero(() => {
        const newHero = {
          ...teamTwo[Math.floor(Math.random() * teamTwo.length)],
        };
        return newHero;
      });
    }
  }, [playerTurn]);

  useEffect(() => {
    //Check for game over on health change
    if (playerOne.health <= 0) {
      setGameOver(true);
    }
    if (playerTwo.health <= 0) {
      setGameOver(true);
      // setCurrentAction('Player Two Lost')
    }
  }, [playerOne, playerTwo]);

  //On gameover change
  useEffect(() => {
    if (gameOver && playerOne.health <= 0) {
      updateDraftGameStats({
        variables: {
          won: false,
        },
      });
    } else if (gameOver && playerTwo.health <= 0) {
      updateDraftGameStats({
        variables: {
          won: true,
        },
      });
    }
  }, [gameOver]);

  return (
    <div className="h-screen tracking-widest heading">
      <h1 className="text-3xl font-bold text-center mt-8">
        {playerTurn ? "Your Turn" : "Enemy Turn"}
      </h1>
      <div className="flex justify-between my-12 mx-9 mb-5">
        <div className="flex flex-col items-center">
          <h1>Player One Health: {playerOne.health}</h1>
          <div className="health-bar">
            <div
              className="health-bar-fill"
              style={{ width: `${playerOne.health}%` }}
            ></div>
          </div>
        </div>

        {currentEnemyHero.loading ? (
          "Loading"
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h3 id="current-action" className="mb-7">
              {currentAction}
            </h3>
            <img
              className="w-40 h-40 rounded shadow-lg shadow-blue-500/50"
              src={currentEnemyHero.data.hero.image.url}
            />
          </div>
        )}
        <div className="flex flex-col items-center">
          <h1>Player Two Health: {playerTwo.health}</h1>
          <div className="health-bar">
            <div
              className="health-bar-fill"
              style={{ width: `${playerTwo.health}%` }}
            ></div>
          </div>
        </div>
      </div>
      {!gameOver ? (
        <div className="flex flex-row justify-center">
          <div className="flex flex-col pb-14 ">
            {!selectingPrompt
              ? teamOne.map((heroResult) => {
                  return (
                    <div
                      className="flex items-center mt-4"
                      key={heroResult.data.hero.name}
                    >
                      <img
                        className="w-8 h-8 bg-gray-200 rounded-full outline outline-offset-2 outline-2 outline-blue-500/50 hover:w-32 hover:h-32"
                        onClick={() =>
                          currentPrompt.resolvePrompt(
                            playerTurn ? playerOne : playerTwo,
                            playerTurn ? playerTwo : playerOne,
                            heroResult,
                            currentEnemyHero
                          )
                        }
                        src={heroResult.data.hero.image.url}
                        alt={heroResult.data.hero.name}
                      ></img>
                      <span className="ml-2">{heroResult.data.hero.name}</span>
                    </div>
                  );
                })
              : battlePrompts.map((prompt) => {
                  return (
                    <div className="flex items-center mt-4" key={prompt.type}>
                      <button
                        onClick={() => {
                          setCurrentPrompt(prompt);
                          setSelectingPrompt(
                            (prevSelectingPrompt) => !prevSelectingPrompt
                          );
                        }}
                        className="bg-red-500 border-stone-800 p-4 rounded"
                      >
                        {prompt.generateButtonPrompt(
                          playerOne.name,
                          playerTwo.name
                        )}
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8">GAME OVER</h1>
          {playerOne.health <= 0 ? (
            <div>
              <p className="text-2xl mb-4">You died and you suck.</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Retry
              </button>
              <Link
                to="/"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back to Main Menu
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl">Congratulations, you won!</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Retry
              </button>
              <Link
                to="/"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back to Main Menu
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
