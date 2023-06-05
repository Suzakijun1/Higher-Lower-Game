const mongoose = require("mongoose");

//Connect to MongoDB

//Export connection
module.exports = mongoose.connection;
