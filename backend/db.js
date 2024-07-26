// backend/db.js
const mongoose = require('mongoose');
const {DB_URL}=  require("./config");
mongoose.connect(DB_URL)

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    problems : Number
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User
};