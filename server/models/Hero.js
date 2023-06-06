const { Schema, model } = require("mongoose");

const heroSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    intelligence : {
        type: Number
    }
});