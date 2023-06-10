import React, { useState, useEffect } from 'react';

export default function DraftBattleBody({ teamOne, teamTwo }) {
    //Player One Object State
    const [currentAction, setCurrentAction] = useState('')
    const [playerOne, setPlayerOne] = useState({
        name: "Player 1",
        health: 0,
        takeDmg: (dmg) => {
            setPlayerOne((prevPlayerOne) => {
                return {
                    ...prevPlayerOne,
                    health: prevPlayerOne.health - dmg
                }
            });
        }
    })

    //Player Two Object State
    const [playerTwo, setPlayerTwo] = useState({
        name: "Player 2",
        health: 0,
        takeDmg: (dmg) => {
            setPlayerTwo((prevPlayerTwo) => {
                return {
                    ...prevPlayerTwo,
                    health: prevPlayerTwo.health - dmg
                }
            });
        }
    })
    //This indicates whose turn to attack is
    const [playerTurn, setPlayerTurn] = useState(false);

    //Checks if you are in the process of using the prompt
    const [selectingPrompt, setSelectingPrompt] = useState(false);

    //Current Prompt Indicates the action that want to be taken once we decide on the heroes
    const [currentPrompt, setCurrentPrompt] = useState({
        generatePrompt: (actingPlayer, opposingPlayer) => {
            return ("No Prompt")
        },
        generateButtonPrompt: (actingPlayer, opposingPlayer) => {
            return ("No Prompt")
        },
        resolvePrompt: (actingPlayer, oposingPlayer, actingHero, opposingHero) => {
            return ("No resolution")
        },
        type: ""
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
                    url: ""
                }
            }
        }
    })

    const battlePrompts = [
        {
            generatePrompt: (actingPlayer, opposingPlayer) => {
                document.getElementById("result").innerText = `${actingPlayer} attempts to trick ${opposingPlayer}`
                return (`${actingPlayer} attempts to trick ${opposingPlayer}`)
            },
            generateButtonPrompt: (actingPlayer, opposingPlayer) => {
                return (`${actingPlayer} attempts to trick ${opposingPlayer}`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                //Check if damage is done
                let opposingHeroInt = Number(opposingHero.data.hero.powerstats.intelligence);
                let actingHeroInt = Number(actingHero.data.hero.powerstats.intelligence)
                if (opposingHeroInt >= actingHeroInt) {
                    console.log("We DID IT!")
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                        if (actingPlayer.name === "Player 2")
                            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt)
                    }, 1000);
                    document.getElementById("result").innerText = `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
                    return `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
                } else {
                    //Calculate damage done after the prompt
                    let dmg = actingHeroInt - opposingHeroInt;
                    opposingPlayer.takeDmg(dmg);
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                        if (actingPlayer.name === "Player 2")
                            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt)
                    }, 1000);
                    console.log("We DID IT!")
                    document.getElementById("result").innerText = `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                    return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                }
            },
            type: "int"
        },
        {
            generatePrompt: (actingPlayer, opposingPlayer) => {
                document.getElementById("result").innerText = `${actingPlayer} is hurling a car at ${opposingPlayer}`
            },
            generateButtonPrompt: (actingPlayer, opposingPlayer) => {
                return (`${actingPlayer} is hurling a car at ${opposingPlayer}`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                //Check if damage is done
                let opposingHeroStr = Number(opposingHero.data.hero.powerstats.strength);
                let actingHeroStr = Number(actingHero.data.hero.powerstats.strength)
                if (opposingHeroStr >= actingHeroStr) {
                    console.log("We DID IT!")
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                        if (actingPlayer.name === "Player 2")
                            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt)
                    }, 1000);
                    document.getElementById("result").innerText = `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
                    return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`
                } else {
                    //Calculate damage done after the prompt
                    let dmg = actingHeroStr - opposingHeroStr;
                    opposingPlayer.takeDmg(dmg);
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                        if (actingPlayer.name === "Player 2")
                            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt)
                    }, 1000);
                    console.log("We DID IT!")
                    document.getElementById("result").innerText = `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                    return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                }
            },
            type: "str"
        },
        {
            generatePrompt: (actingPlayer, opposingPlayer) => {
                document.getElementById("result").innerText = `${actingPlayer} runs circles around ${opposingPlayer}`
            },
            generateButtonPrompt: (actingPlayer, opposingPlayer) => {
                return (`${actingPlayer} runs circles around ${opposingPlayer}`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                //Check if damage is done
                let opposingHeroSpd = Number(opposingHero.data.hero.powerstats.speed);
                let actingHeroSpd = Number(actingHero.data.hero.powerstats.speed)
                if (opposingHeroSpd >= actingHeroSpd) {
                    console.log("We DID IT!")
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                        if (actingPlayer.name === "Player 2")
                            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt)
                    }, 1000);
                    document.getElementById("result").innerText = `${opposingPlayer.name} successfully countered ${actingPlayer.name}'s action`
                    return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`
                } else {
                    //Calculate damage done after the prompt
                    let dmg = actingHeroSpd - opposingHeroSpd
                    //After a delay set
                    opposingPlayer.takeDmg(dmg);
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                        if (actingPlayer.name === "Player 2")
                            setSelectingPrompt((prevSelectingPrompt) => !prevSelectingPrompt)
                    }, 1000);
                    document.getElementById("result").innerText = `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                    return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                }
            },
            type: "spd"
        },
    ]

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
            health: 50
        });
        let p2health = teamTwo.reduce(getDur, 0);
        setPlayerTwo({
            ...playerTwo,
            health: 50
        });
        //Set the computers prompt to a random one
        setCurrentPrompt(battlePrompts[Math.floor(Math.random() * battlePrompts.length)]);
        setCurrentEnemyHero(() => {
            const newHero = { ...teamTwo[Math.floor(Math.random() * teamTwo.length)] }
            return newHero
        });
    }, [])

    // Hero 
    useEffect(() => {
        currentPrompt.generatePrompt(playerTurn ? playerOne.name : playerTwo.name, playerTurn ? playerTwo.name : playerOne.name)
        setCurrentEnemyHero(() => {
            const newHero = { ...teamTwo[Math.floor(Math.random() * teamTwo.length)] }
            return newHero
        });
    }, [currentPrompt])

    useEffect(() => {
        if (!playerTurn) {
            //Set the computers prompt to a random one
            setCurrentPrompt(battlePrompts[Math.floor(Math.random() * battlePrompts.length)]);
            setCurrentEnemyHero(() => {
                const newHero = { ...teamTwo[Math.floor(Math.random() * teamTwo.length)] }
                return newHero
            });
        }
    }, [playerTurn])

    return playerOne.health > 0 && playerTwo.health > 0 ? (
      <div className="h-screen tracking-widest heading">
        <h1 className="text-3xl font-bold text-center mt-8">
          {playerTurn ? "Your Turn" : "Enemy Turn"}
        </h1>
        <div className="flex justify-between my-12 mx-9">
          <h1>Player One Health: {playerOne.health}</h1>
          {currentEnemyHero.loading ? (
            "Loading"
          ) : (
            <div>
              <h3 id="result"></h3>
              <img
                className="w-40 h-40 rounded ml-12"
                src={currentEnemyHero.data.hero.image.url}
              />
            </div>
          )}
          <h1>Player Two Health: {playerTwo.health}</h1>
        </div>
        <div className="flex flex-col items-center pb-14">
          {!selectingPrompt
            ? teamOne.map((heroResult) => {
                return (
                  <div className="flex items-center mt-4">
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
                    ></img>
                    <span className="ml-2">{heroResult.data.hero.name}</span>
                  </div>
                );
              })
            : battlePrompts.map((prompt) => {
                return (
                  <div className="flex items-center mt-4">
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
      <div>Game Over</div>
    );
}