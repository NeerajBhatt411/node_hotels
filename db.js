const mongoose = require("mongoose");
const dotenv = require("dotenv");

require('dotenv').config()

// const MONGO_URL = process.env.MONGO_URL;
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGO_URL
// Set up MongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,  // (Not needed in Mongoose v6+)
    // useUnifiedTopology: true  // (Not needed in Mongoose v6+)
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to MongoDB server");
});

db.on("error", (err) => {  
    console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = db;
