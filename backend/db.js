// backend/db.js
const mongoose = require('mongoose');
const {DB_URL}=  require("./config");
mongoose.connect(DB_URL)

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username: String,
    problems : Number,
    easy : Number,
    medium : Number,
    hard : Number,
    password : String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User
};