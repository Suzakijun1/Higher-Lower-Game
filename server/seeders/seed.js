const db = require("../config/connection");
const { User, Hero } = require("../models");
const heroSeeds = require("./heroData.json");
const userSeeds = require("./userData.json");



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
