import { useQuery } from "@apollo/client";
import {useEffect} from "react";
import { HERO_IMG } from "../utils/queries";

const DraftBody = (props) => {

  const heroOneResults = useQuery(HERO_IMG, {
    variables : {
        heroId : props.heroOneId + ""
  }
  })
  const heroTwoResults = useQuery(HERO_IMG, {
      variables : {
        heroId : props.heroTwoId + ""
    }
  })

  useEffect(()=> {
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

  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      {/* HEADING */}
      <h1 className="text-2xl font-bold mb-4">Pick One</h1>

      <div className="flex gap-6 mt-4">
        {/* Left Superhero/Villain Card - Will hold image*/}
        {heroOneResults.loading ? 'Loading' : <div><h3>{heroOneResults.data.hero.name}</h3><img onClick={()=>onSelectHero(heroOneResults, heroTwoResults)} className="w-40 h-40 rounded" src={heroOneResults.data.hero.image.url}></img></div>}
        {/* Right Superhero/Villain Card - Will hold image */}
        {heroTwoResults.loading ? 'Loading' : <div><h3>{heroTwoResults.data.hero.name}</h3><img onClick={()=>onSelectHero(heroTwoResults, heroOneResults)} className="w-40 h-40 rounded" src={heroTwoResults.data.hero.image.url}></img></div>}
      </div>
      <div className="flex gap-6">
        {/* Left Column - Player */}
        <div className="flex flex-col">
          <div className="w-100 h-100 bg-gray-200"></div>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 1</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 2</span>
          </div>
          {/* Add more names here */}
        </div>

        {/* Left and right column divider "VS" */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-500">VS</h2>
        </div>

        {/* Right Column - Computer */}
        <div className="flex flex-col">
          <div className="w-100 h-100 bg-gray-200"></div>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 1</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full">img</div>
            <span className="ml-2">Name 2</span>
          </div>
          {/* Add more names here */}
        </div>
      </div>
    </div>
  );
};

export default DraftBody;
