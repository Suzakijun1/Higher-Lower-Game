const { AuthenticationError } = require("apollo-server-express");
const { User, Hero } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "HigherLowerGameHighestScore"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    heroes: async () => {
      return Hero.find();
    },
    hero: async (parent, { id }) => {
      return Hero.findOne({
        id,
      });
    },
  },

  Mutation: {
    addUser: async (parent, { email, username, password }) => {
      const user = await User.create({
        email,
        username,
        password,
        higherLowerGameHighestScore: 0,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    updateHigherLowerHighestScore: async (parent, { streak, username }, context) => {

      const updatedUser = await User.findOneAndUpdate(
        { username },
        { higherLowerGameHighestScore: streak },
        { new: true }
      )

      return updatedUser;
    }
  },
};

module.exports = resolvers;
