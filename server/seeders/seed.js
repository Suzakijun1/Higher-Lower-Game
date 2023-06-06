const db = require('../config/connection');
const { Hero } = require('../models');
const heroSeeds = require('./heroData.json');

db.once('open', async () => {
  try {
    await Hero.deleteMany({});

    await Hero.create(heroSeeds);


  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
