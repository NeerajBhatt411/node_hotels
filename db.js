const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/hotels";

// Set up MongoDB connection
mongoose.connect(MONGO_URL, {
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
