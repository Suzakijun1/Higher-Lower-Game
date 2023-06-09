const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  higherLowerGamesPlayed: {
    type: Number,
    default: 0,
  },
  higherLowerGameHighestScore: {
    type: Number,
    default: 0,
  },
  draftGamesPlayed: {
    type: Number,
    default: 0,
  },
  draftGameWins: {
    type: Number,
    default: 0,
  },
  draftGameLosses: {
    type: Number,
    default: 0,
  }
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
