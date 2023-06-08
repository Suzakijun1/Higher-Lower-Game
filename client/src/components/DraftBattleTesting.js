import React, { useState, useEffect } from 'react';

export default function DraftBattleBodyTest({ teamOne, teamTwo }) {
    const [pOneHealth, setPOneHealth] = useState(0);
    const [pTwoHealth, setPTwoHealth] = useState(0);
    const [playerOne, setPlayerOne] = useState({
        name: "Player 1",
        health: 0,
        takeDmg: (dmg) => {
            setPlayerOne((prevPlayerOne) =>{
                return {
                ...prevPlayerOne,
                health : prevPlayerOne.health - dmg
                }
            });
        }
    })
    const [playerTwo, setPlayerTwo] = useState({
        name: "Player 2",
        health: 0,
        takeDmg: (dmg) => {
            setPlayerTwo((prevPlayerTwo) =>{
                return {
                ...prevPlayerTwo,
                health : prevPlayerTwo.health - dmg
                }
            });
        }
    })
    const [playerTurn, setPlayerTurn] = useState(false)
    const [currentPrompt, setCurrentPrompt] = useState({
        generatePrompt: (heroName) => {
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
            generatePrompt: (heroName) => {
                return (`${heroName} attempts to trick you`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                //Check if damage is done
                let opposingHeroInt = Number(opposingHero.data.hero.powerstats.intelligence);
                let actingHeroInt = Number(actingHero.data.hero.powerstats.intelligence)
                if (opposingHeroInt>= actingHeroInt) {
                    return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`
                } else {
                    //Calculate damage done after the prompt
                    let dmg = actingHeroInt - opposingHeroInt;
                    opposingPlayer.takeDmg(dmg);
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                    }, 3000);
                    return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                }
            },
            type: "int"
        },
        {
            generatePrompt: (heroName) => {
                return (`${heroName} is hurling a car at you`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                //Check if damage is done
                let opposingHeroStr = Number(opposingHero.data.hero.powerstats.strength);
                let actingHeroStr = Number(actingHero.data.hero.powerstats.strength)
                if (opposingHero.data.hero.powerstats.strength >= actingHero.data.hero.powerstats.strength) {
                    return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`
                } else {
                    //Calculate damage done after the prompt
                    let dmg = actingHeroStr - opposingHeroStr;
                    
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                    }, 3000);
                    return `${actingPlayer.name} has dealt ${dmg} to ${opposingPlayer.name}`
                }
            },
            type: "str"
        },
        {
            generatePrompt: (heroName) => {
                return (`${heroName} runs circles around you`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                //Check if damage is done
                let opposingHeroSpd = Number(opposingHero.data.hero.powerstats.speed);
                let actingHeroSpd = Number(actingHero.data.hero.powerstats.speed)
                if (opposingHeroSpd >= actingHeroSpd) {
                    return `${opposingPlayer.name} successfully countered ${actingPlayer.name} action`
                } else {
                    //Calculate damage done after the prompt
                    let dmg = actingHeroSpd - opposingHeroSpd
                    //After a delay set
                    setTimeout(() => {
                        setPlayerTurn((prevPlayerTurn) => !prevPlayerTurn)
                    }, 3000);
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
            health: p1health
        });
        let p2health = teamTwo.reduce(getDur, 0);
        setPlayerTwo({
            ...playerTwo,
            health: p2health
        });
        //Set the computers prompt to a random one
        setCurrentPrompt(battlePrompts[Math.floor(Math.random() * battlePrompts.length)]);
        setCurrentEnemyHero((prevEnemyHero) => {
            const newHero = { ...teamTwo[Math.floor(Math.random() * teamTwo.length)] }
            console.log(newHero);
            return newHero
        });
    }, [])

    // Hero 
    useEffect(() => {
        console.log(playerOne.health)
    }, [playerOne])


    return (
        <div className='flex justify-between my-12 mx-9'>
            <h1>Player One Health: {playerOne.health}</h1>
            {currentEnemyHero.loading ? (
                "Loading"
            ) : (
                <div>
                    <h3>{currentPrompt.generatePrompt(currentEnemyHero.data.hero.name)}</h3>
                    <img
                        className="w-40 h-40 rounded"
                        src={currentEnemyHero.data.hero.image.url}
                    />
                </div>
            )}
            <h1>Player Two Health: {playerTwo.health}</h1>
            {/* <h1> Prompt Resolution: {currentPrompt.resolvePrompt(playerTwo, playerOne, currentEnemyHero, teamOne[0])}</h1> */}
            <button className="nbtn btn-blue"onClick={() => {playerOne.takeDmg(5)}}>  </button>
        </div>
    )
}