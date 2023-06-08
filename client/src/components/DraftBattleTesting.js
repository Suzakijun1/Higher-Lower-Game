import React, { useState, useEffect } from 'react';

export default function DraftBattleBodyTest({teamOne, teamTwo}) {
    const [pOneHealth, setPOneHealth] = useState(0);
    const [pTwoHealth, setPTwoHealth] = useState(0);
    const [currentPrompt, setCurrentPrompt] = useState({
        generatePrompt : () => {
            return ("No Prompt")
        },
        type : ""
    });
    
    const battlePrompts = [
        {
            generatePrompt: (heroName) => {
                return (`${heroName} attempts to trick you`)
            },
            type: "int"
        },
        {
            generatePrompt: (heroName) => {
                return (`${heroName} is hurling a car at you`)
            },
            type: "str"
        },
        {
            generatePrompt: (heroName) => {
                return (`${heroName} runs circles around you`)
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
    }, [])

    return (
        <div className='flex justify-center justify-between my-12 mx-9'>
            <h1>Player One Health: {pOneHealth}</h1>
            <h1>{currentPrompt !== {} ? currentPrompt.generatePrompt(teamTwo[Math.floor(Math.random() * teamTwo.length)].data.hero.name) : ""}</h1>
            <h1>Player Two Health: {pTwoHealth}</h1>
        </div>
    )
}