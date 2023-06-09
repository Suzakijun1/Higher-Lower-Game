const { AuthenticationError } = require("apollo-server-express");
const { User, Hero } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, args, context) => {
      return User.findOne({ _id : context.user._id });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
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

      user.achievements

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
    updateHigherLowerHighestScore: async (parent, { streak }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { username : context.user.username },
          { higherLowerGameHighestScore: streak },
          { new: true }
          )
          return updatedUser;
      }

      throw new AuthenticationError("Not Logged In!");
    }
  },
};

module.exports = resolvers;
