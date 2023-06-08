import React, { useState, useEffect } from 'react';

export default function DraftBattleBodyTest({teamOne, teamTwo}) {
    const [pOneHealth, setPOneHealth] = useState(0);
    const [pTwoHealth, setPTwoHealth] = useState(0);
    
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
        // {
        //     generatePrompt: (heroName) => {
        //         return (`${heroName} is hurling a car at you`)
        //     },
        //     type: "int"
        // },
        // {
        //     generatePrompt: (heroName) => {
        //         return (`${heroName} is hurling a car at you`)
        //     },
        //     type: "str"
        // },
        // {
        //     generatePrompt: (heroName) => {
        //         return (`${heroName} is hurling a car at you`)
        //     },
        //     type: "spd"
        // },
    ]
    function getDur(total, heroResult) {
        let dur = heroResult.data.hero.powerstats.durability;
        if (dur === "null") {
            return total;
        }
        return total + Number(dur);
    }

    useEffect(() => {
        let p1health = teamOne.reduce(getDur, 0);
        setPOneHealth(p1health);
    }, [])

    useEffect(() => {
        console.log(battlePrompts[Math.floor(Math.random()*battlePrompts.length)].generatePrompt(teamTwo[Math.floor(Math.random() * teamTwo.length)].data.hero.name));
        console.log(pOneHealth)
    }, [pOneHealth])

    return (
        <h1></h1>
    )
}