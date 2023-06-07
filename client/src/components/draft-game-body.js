import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { HERO_IMG } from "../utils/queries";

const DraftBody = (props) => {

  const heroOneResults = useQuery(HERO_IMG, {
    variables: {
      heroId: props.heroOneId + ""
    }
  })
  const heroTwoResults = useQuery(HERO_IMG, {
    variables: {
      heroId: props.heroTwoId + ""
    }
  })

  useEffect(() => {
    console.log(props.teamOne)
    console.log(props.teamTwo)

    //Get new hero one id
    let newHeroOneId = props.unseenIds[Math.floor(Math.random() * props.unseenIds.length)]

    //Set the aforementioned value to heroTwoId
    props.setHeroOneId(newHeroOneId)

    let newIds = props.unseenIds.filter(id => id !== newHeroOneId);
    props.setUnseenIds(newIds)
    //Get new hero one id
    let newHeroTwoId = props.unseenIds[Math.floor(Math.random() * props.unseenIds.length)]

    //Set the aforementioned value to heroTwoId
    props.setHeroTwoId(newHeroTwoId)

    newIds = props.unseenIds.filter(id => id !== newHeroTwoId);
    props.setUnseenIds(newIds)

  }, [props.teamOne])


  const onSelectHero = (heroResult, leftoverResult) => {
    //Adds to your team the hero you chose
    props.setTeamOne((prevTeamOne) => {
      return [...prevTeamOne, heroResult]
    })
    //Adds to team two the hero you did not choose
    props.setTeamTwo((prevTeamTwo) => {
      return [...prevTeamTwo, leftoverResult]
    })
  }

  function getInt(total, heroResult) {
    let int = heroResult.data.hero.powerstats.intelligence
    console.log(int)
    if (int === "null") {
      return total;
    }
    return total + Number(int)
  }
  function getStr(total, heroResult) {
    let str = heroResult.data.hero.powerstats.strength
    console.log(str)
    if (str === "null") {
      return total;
    }
    return total + Number(str)
  }
  function getSpd(total, heroResult) {
    let spd = heroResult.data.hero.powerstats.speed
    console.log(spd)
    if (spd === "null") {
      return total;
    }
    return total + Number(spd)
  }
  function getDur(total, heroResult) {
    let dur = heroResult.data.hero.powerstats.durability
    console.log(dur)
    if (dur === "null") {
      return total;
    }
    return total + Number(dur)
  }
  function getPow(total, heroResult) {
    let pow = heroResult.data.hero.powerstats.power
    console.log(pow)
    if (pow === "null") {
      return total;
    }
    return total + Number(pow)
  }
  function getCmb(total, heroResult) {
    let cmb = heroResult.data.hero.powerstats.combat
    console.log(cmb)
    if (cmb === "null") {
      return  ;
    }
    return total + Number(cmb)
  }

  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      {/* HEADING */}
      <h1 className="text-2xl font-bold mb-4">Pick One</h1>

      <div className="flex gap-6 mt-4">
        {/* Left Superhero/Villain Card - Will hold image*/}
        {heroOneResults.loading ? 'Loading' : <div><h3>{heroOneResults.data.hero.name}</h3><img onClick={() => onSelectHero(heroOneResults, heroTwoResults)} className="w-40 h-40 rounded" src={heroOneResults.data.hero.image.url}></img></div>}
        {/* Right Superhero/Villain Card - Will hold image */}
        {heroTwoResults.loading ? 'Loading' : <div><h3>{heroTwoResults.data.hero.name}</h3><img onClick={() => onSelectHero(heroTwoResults, heroOneResults)} className="w-40 h-40 rounded" src={heroTwoResults.data.hero.image.url}></img></div>}
      </div>
      <div className="flex gap-6">
        {/* Left Column - Player */}
        <div className="flex flex-col">
          <div className="w-100 h-100">Player 1</div>
          <div>{props.teamOne.length !== 0 ? `Intelligence: ${Math.round(props.teamOne.reduce(getInt, 0) / props.teamOne.length)}` : ''}</div>
          <div>{props.teamOne.length !== 0 ? `Strength: ${Math.round(props.teamOne.reduce(getStr, 0) / props.teamOne.length)}` : ''}</div>
          <div>{props.teamOne.length !== 0 ? `Speed: ${Math.round(props.teamOne.reduce(getSpd, 0) / props.teamOne.length)}` : ''}</div>
          <div>{props.teamOne.length !== 0 ? `Durability: ${Math.round(props.teamOne.reduce(getDur, 0) / props.teamOne.length)}` : ''}</div>
          <div>{props.teamOne.length !== 0 ? `Power: ${Math.round(props.teamOne.reduce(getPow, 0) / props.teamOne.length)}` : ''}</div>
          <div>{props.teamOne.length !== 0 ? `Combat: ${Math.round(props.teamOne.reduce(getCmb, 0) / props.teamOne.length)}` : ''}</div>

          {props.teamOne.map((heroResult) => {
            return (
              <div className="flex items-center mt-4">
                <img className="w-8 h-8 bg-gray-200 rounded-full" src={heroResult.data.hero.image.url}></img>
                <span className="ml-2">{heroResult.data.hero.name}</span>
              </div>
            )
          })}
          {/* Add more names here */}
        </div>

        {/* Left and right column divider "VS" */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-500">VS</h2>
        </div>

        {/* Right Column - Computer */}
        <div className="flex flex-col">
          <div className="w-100 h-100">Player 1</div>
          <div>{props.teamTwo.length !== 0 ? `Intelligence: ${Math.round(props.teamTwo.reduce(getInt, 0) / props.teamTwo.length)}` : ''}</div>
          <div>{props.teamTwo.length !== 0 ? `Strength: ${Math.round(props.teamTwo.reduce(getStr, 0) / props.teamTwo.length)}` : ''}</div>
          <div>{props.teamTwo.length !== 0 ? `Speed: ${Math.round(props.teamTwo.reduce(getSpd, 0) / props.teamTwo.length)}` : ''}</div>
          <div>{props.teamTwo.length !== 0 ? `Durability: ${Math.round(props.teamTwo.reduce(getDur, 0) / props.teamTwo.length)}` : ''}</div>
          <div>{props.teamTwo.length !== 0 ? `Power: ${Math.round(props.teamTwo.reduce(getPow, 0) / props.teamTwo.length)}` : ''}</div>
          <div>{props.teamTwo.length !== 0 ? `Combat: ${Math.round(props.teamTwo.reduce(getCmb, 0) / props.teamTwo.length)}` : ''}</div>
          <div className="w-100 h-100 bg-gray-200"></div>
          {props.teamTwo.map((heroResult) => {
              return (
                <div className="flex items-center mt-4">
                  <img className="w-8 h-8 bg-gray-200 rounded-full" src={heroResult.data.hero.image.url}></img>
                  <span className="ml-2">{heroResult.data.hero.name}</span>
                </div>
              )
            })}
          {/* Add more names here */}
        </div>
      </div>
    </div>
  );
};

export default DraftBody;
