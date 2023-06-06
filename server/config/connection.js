const mongoose = require("mongoose");

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hero');
//Export connection
module.exports = mongoose.connection;
