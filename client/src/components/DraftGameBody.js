import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { HERO_IMG } from "../utils/queries";
import Divider from "./Divider";
import soundFx from "../sounds/080953_semi-auto-pistol-39750.wav";

const DraftBody = (props) => {
  const playSound = () => {
    new Audio(soundFx).play();
  };

  const MAX_TEAM_SIZE = 5;
  const [draftRounds, setDraftRounds] = useState(0);

  const heroOneResults = useQuery(HERO_IMG, {
    variables: {
      heroId: props.heroOneId + "",
    },
  });

  const heroTwoResults = useQuery(HERO_IMG, {
    variables: {
      heroId: props.heroTwoId + "",
    },
  });

  useEffect(() => {
    console.log(props.teamOne);
    console.log(props.teamTwo);
    console.log(draftRounds);

    //Get new hero one id
    let newHeroOneId =
      props.unseenIds[Math.floor(Math.random() * props.unseenIds.length)];

    //Set the aforementioned value to heroTwoId
    props.setHeroOneId(newHeroOneId);

    let newIds = props.unseenIds.filter((id) => id !== newHeroOneId);
    props.setUnseenIds(newIds);
    //Get new hero one id
    let newHeroTwoId =
      props.unseenIds[Math.floor(Math.random() * props.unseenIds.length)];

    //Set the aforementioned value to heroTwoId
    props.setHeroTwoId(newHeroTwoId);

    newIds = props.unseenIds.filter((id) => id !== newHeroTwoId);
    props.setUnseenIds(newIds);

    //Once you draft the amount to hit the max team size set the isDrafting boolean to false.
    if (draftRounds === MAX_TEAM_SIZE) {
      props.setIsDrafting(false);
    }
  }, [props.teamOne]);

  const onSelectHero = (heroResult, leftoverResult) => {
    //Adds to your team the hero you chose
    props.setTeamOne((prevTeamOne) => {
      return [...prevTeamOne, heroResult];
    });
    //Adds to team two the hero you did not choose
    props.setTeamTwo((prevTeamTwo) => {
      return [...prevTeamTwo, leftoverResult];
    });

    //After adding to the teams increase the amount of draft rounds done.
    setDraftRounds((prevDraftRounds) => {
      return prevDraftRounds + 1;
    });
  };

  function getInt(total, heroResult) {
    let int = heroResult.data.hero.powerstats.intelligence;
    if (int === "null") {
      return total;
    }
    return total + Number(int);
  }
  function getStr(total, heroResult) {
    let str = heroResult.data.hero.powerstats.strength;
    if (str === "null") {
      return total;
    }
    return total + Number(str);
  }

  function getSpd(total, heroResult) {
    let spd = heroResult.data.hero.powerstats.speed;
    if (spd === "null") {
      return total;
    }
    return total + Number(spd);
  }
  function getDur(total, heroResult) {
    let dur = heroResult.data.hero.powerstats.durability;
    if (dur === "null") {
      return total;
    }
    return total + Number(dur);
  }
  function getPow(total, heroResult) {
    let pow = heroResult.data.hero.powerstats.power;
    if (pow === "null") {
      return total;
    }
    return total + Number(pow);
  }
  function getCmb(total, heroResult) {
    let cmb = heroResult.data.hero.powerstats.combat;
    if (cmb === "null") {
      return;
    }
    return total + Number(cmb);
  }

  return (
    <div className="flex flex-col items-center mt-10 ">
      {/* HEADING */}
      <h1 className="heading text-2xl font-bold mb-4 tracking-widest">
        Pick One
      </h1>

      <div className="flex gap-6 mt-4">
        {/* ::::::::::::::::::::::::::::::::::::::::::::: */}
        {/* Left Superhero/Villain Card - Will hold image */}
        {/* ::::::::::::::::::::::::::::::::::::::::::::: */}
        {heroOneResults.loading ? (
          "Loading"
        ) : (
          <div>
            <h3 className="hero-name my-2 mx-2 text-center w-40 tracking-widest">
              {heroOneResults.data.hero.name}
            </h3>
            <img
              onClick={() => {
                playSound();
                onSelectHero(heroOneResults, heroTwoResults);
              }}
              className="w-40 h-40 my-3 rounded min-w-full shadow-lg shadow-blue-500/50 hover:outline outline-offset-2 outline-blue-500/50 hover:w-48 hover:h-48 "
              src={heroOneResults.data.hero.image.url}
            ></img>
          </div>
        )}
        {/* :::::::::::::::::::::::::::::::::::::::::::::: */}
        {/* Right Superhero/Villain Card - Will hold image */}
        {/* :::::::::::::::::::::::::::::::::::::::::::::: */}
        {heroTwoResults.loading ? (
          "Loading"
        ) : (
          <div>
            <h3 className="hero-name my-2 mx-2 text-center w-40 tracking-widest">
              {heroTwoResults.data.hero.name}
            </h3>
            <img
              onClick={() => {
                playSound();
                onSelectHero(heroTwoResults, heroOneResults);
              }}
              className="w-40 h-40 my-3 rounded shadow-lg shadow-blue-500/50 min-w-full hover:outline outline-offset-2 outline-blue-500/50 hover:w-48 hover:h-48"
              src={heroTwoResults.data.hero.image.url}
            ></img>
          </div>
        )}
      </div>
      {/* DIV FOR STATS */}
      <div className="heading flex space-x-20 mt-3 mb-4">
        {/* STATS PLAYER 1*/}
        <div className="container mx-auto tracking-widest">
          <div>
            {props.teamOne.length !== 0
              ? `Intelligence: ${Math.round(
                  props.teamOne.reduce(getInt, 0) / props.teamOne.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamOne.length !== 0
              ? `Strength: ${Math.round(
                  props.teamOne.reduce(getStr, 0) / props.teamOne.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamOne.length !== 0
              ? `Speed: ${Math.round(
                  props.teamOne.reduce(getSpd, 0) / props.teamOne.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamOne.length !== 0
              ? `Durability: ${Math.round(
                  props.teamOne.reduce(getDur, 0) / props.teamOne.length
                )}`
              : ""}
          </div>
          {/* <div>
            {props.teamOne.length !== 0
              ? `Power: ${Math.round(
                  props.teamOne.reduce(getPow, 0) / props.teamOne.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamOne.length !== 0
              ? `Combat: ${Math.round(
                  props.teamOne.reduce(getCmb, 0) / props.teamOne.length
                )}`
              : ""}
          </div> */}
        </div>

        {/* STATS PLAYER 2*/}
        <div className="heading container mx-auto tracking-widest">
          <div>
            {props.teamTwo.length !== 0
              ? `Intelligence: ${Math.round(
                  props.teamTwo.reduce(getInt, 0) / props.teamTwo.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamTwo.length !== 0
              ? `Strength: ${Math.round(
                  props.teamTwo.reduce(getStr, 0) / props.teamTwo.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamTwo.length !== 0
              ? `Speed: ${Math.round(
                  props.teamTwo.reduce(getSpd, 0) / props.teamTwo.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamTwo.length !== 0
              ? `Durability: ${Math.round(
                  props.teamTwo.reduce(getDur, 0) / props.teamTwo.length
                )}`
              : ""}
          </div>
          {/* <div>
            {props.teamTwo.length !== 0
              ? `Power: ${Math.round(
                  props.teamTwo.reduce(getPow, 0) / props.teamTwo.length
                )}`
              : ""}
          </div>
          <div>
            {props.teamTwo.length !== 0
              ? `Combat: ${Math.round(
                  props.teamTwo.reduce(getCmb, 0) / props.teamTwo.length
                )}`
              : ""}
          </div> */}
        </div>
      </div>
      <div className="border mb-4 w-80 border-red-800/50"></div>
      {/* :::::::: Divider :::::::::: */}
      {/* <div>
        <Divider />
      </div> */}
      <div className="flex gap-6 tracking-widest heading">
        {/* Left Column - Player */}
        <div className="flex flex-col ml-5">
          <div className="w-100 h-100 text-xl">Player 1</div>

          {props.teamOne.map((heroResult) => {
            return (
              <div
                className="flex items-center mt-4"
                key={heroResult.data.hero.id}
              >
                <img
                  className="w-8 h-8 bg-gray-200 rounded-full outline outline-offset-2 outline-2 outline-blue-500/70 hover:w-32 hover:h-32"
                  src={heroResult.data.hero.image.url}
                ></img>
                <span className="ml-2">{heroResult.data.hero.name}</span>
              </div>
            );
          })}
          {/* Add more names here */}
        </div>

        {/* Left and right column divider "VS" */}
        <div className="pr-5 flex flex-col items-center justify-center">
          <h2 className="heading text-4xl font-bold text-gray-500">VS</h2>
        </div>

        {/* Right Column - Computer */}
        <div className="flex flex-col">
          <div className="w-100 h-100 text-xl">Player 2</div>

          <div className="w-100 h-100 bg-gray-200"></div>
          {props.teamTwo.map((heroResult) => {
            return (
              <div
                className="flex items-center mt-4"
                key={heroResult.data.hero.id}
              >
                <img
                  className="w-8 h-8 bg-gray-200 rounded-full outline outline-offset-2 outline-2 outline-orange-500/70 hover:w-32 hover:h-32"
                  src={heroResult.data.hero.image.url}
                ></img>
                <span className="ml-2">{heroResult.data.hero.name}</span>
              </div>
            );
          })}
          {/* Add more names here */}
        </div>
      </div>
    </div>
  );
};

export default DraftBody;
