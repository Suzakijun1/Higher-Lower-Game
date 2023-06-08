const db = require("../config/connection");
const { User, Hero } = require("../models");
const heroSeeds = require("./heroData.json");
const userSeeds = require("./userData.json");

for(let i = 0; i < heroSeeds.length; i++){
  if(heroSeeds[i].powerstats.intelligence === "null"){
    heroSeeds[i].powerstats.intelligence = Math.floor(Math.random() * 70) + "";
  }
  if(heroSeeds[i].powerstats.strength === "null"){
    heroSeeds[i].powerstats.strength = Math.floor(Math.random() * 70) + "";
  }
  if(heroSeeds[i].powerstats.speed === "null"){
    heroSeeds[i].powerstats.speed = Math.floor(Math.random() * 70) + "";
  }
  if(heroSeeds[i].powerstats.durability === "null"){
    heroSeeds[i].powerstats.durability = Math.floor(Math.random() * 70) + "";
  }
  if(heroSeeds[i].powerstats.power === "null"){
    heroSeeds[i].powerstats.power = Math.floor(Math.random() * 70) + "";
  }
  if(heroSeeds[i].powerstats.combat === "null"){
    heroSeeds[i].powerstats.combat = Math.floor(Math.random() * 70) + "";
  }
}


db.once("open", async () => {
  try {
    await Hero.deleteMany({});
    await Hero.create(heroSeeds);

    await User.deleteMany({});
    await User.create(userSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
