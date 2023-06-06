const { Schema, model } = require("mongoose");

// Define the schema
const heroSchema = Schema({
    response: String,
    id: String,
    name: String,
    powerstats: {
      intelligence: String,
      strength: String,
      speed: String,
      durability: String,
      power: String,
      combat: String,
    },
    biography: {
      'full-name': String,
      'alter-egos': String,
      aliases: [String],
      'place-of-birth': String,
      'first-appearance': String,
      publisher: String,
      alignment: String,
    },
    appearance: {
      gender: String,
      race: String,
      height: [String],
      weight: [String],
      'eye-color': String,
      'hair-color': String,
    },
    work: {
      occupation: String,
      base: String,
    },
    connections: {
      'group-affiliation': String,
      relatives: String,
    },
    image: {
      url: String,
    },
  });

const Hero = model('Hero', heroSchema);

module.exports = Hero;