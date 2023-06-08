import React, { useState, useEffect } from 'react';

export default function DraftBattleBodyTest({teamOne, teamTwo}) {
    const [pOneHealth, setPOneHealth] = useState(0);
    const [pTwoHealth, setPTwoHealth] = useState(0);
    const [playerTurn, setTurn] = useState()
    const [currentPrompt, setCurrentPrompt] = useState({
        generatePrompt : (heroName) => {
            return ("No Prompt")
        },
        resolvePrompt : (actingPlayer, oposingPlayer, actingHero, opposingHero) => {
            return ("No resolution")
        },
        type : ""
    });
    const [currentEnemyHero, setCurrentEnemyHero] = useState({
        data : {
            hero : {
                name : "",
                powerstats : {
                    intelligence : "",
                    strength : "",
                    speed : "",
                    durability : "",
                },
                image : {
                    url : ""
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
                if(opposingHero.data.hero.powerstats.intelligence > actingHero.data.hero.powerstats.intelligence){
                    return `${opposingPlayer} successfully countered ${actingPlayer} action`
                } else{
                    let dmg = actingHero.data.hero.powerstats.intelligence - opposingHero.data.hero.powerstats.intelligence
                    return `${actingPlayer} has dealt ${dmg} to ${opposingPlayer}`
                }
            },
            type: "int"
        },
        {
            generatePrompt: (heroName) => {
                return (`${heroName} is hurling a car at you`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                if(opposingHero.data.hero.powerstats.intelligence > actingHero.data.hero.powerstats.intelligence){
                    return `${opposingPlayer} successfully countered ${actingPlayer} action`
                } else{
                    let dmg = actingHero.data.hero.powerstats.intelligence - opposingHero.data.hero.powerstats.intelligence
                    
                    return `${actingPlayer} has dealt ${dmg} to ${opposingPlayer}`
                }
            },
            type: "str"
        },
        {
            generatePrompt: (heroName) => {
                return (`${heroName} runs circles around you`)
            },
            resolvePrompt: (actingPlayer, opposingPlayer, actingHero, opposingHero) => {
                if(opposingHero.data.hero.powerstats.intelligence > actingHero.data.hero.powerstats.intelligence){
                    return `${opposingPlayer} successfully countered ${actingPlayer} action`
                } else{
                    let dmg = actingHero.data.hero.powerstats.intelligence - opposingHero.data.hero.powerstats.intelligence
                    return `${actingPlayer} has dealt ${dmg} to ${opposingPlayer}`
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
        setPOneHealth(p1health);
        let p2health = teamTwo.reduce(getDur, 0);
        setPTwoHealth(p2health);
        //Set the computers prompt to a random one
        setCurrentPrompt(battlePrompts[Math.floor(Math.random()*battlePrompts.length)]);
        setCurrentEnemyHero((prevEnemyHero) => {
            const newHero = {...teamTwo[Math.floor(Math.random() * teamTwo.length)]}
            console.log(newHero);
            return newHero
        });
    }, [])

    // Hero 
    useEffect(() => {
      console.log(currentEnemyHero)
    }, [currentEnemyHero])
    

    return (
        <div className='flex justify-between my-12 mx-9'>
            <h1>Player One Health: {pOneHealth}</h1>
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
            <h1>Player Two Health: {pTwoHealth}</h1>
            <h1> Prompt Resolution: {currentPrompt.resolvePrompt("Player 2", "Player 1", currentEnemyHero, teamOne[0])}</h1>
        </div>
    )
}