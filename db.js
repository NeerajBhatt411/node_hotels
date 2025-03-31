const mongoose = require("mongoose");
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

// MongoDB connection with SSL options for Render
mongoose.connect(mongoURL, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  ssl: true,
  tlsAllowInvalidCertificates: false, // Should be true only for development
  retryWrites: true,
  w: 'majority'
});

const db = mongoose.connection;

// Event handlers with better logging
db.on("connected", () => {
  console.log(`✅ MongoDB connected to ${mongoose.connection.host}`);
});

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  // Graceful shutdown in production
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

db.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
  // Auto-reconnect logic
  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => mongoose.connect(mongoURL), 5000);
  }
});

// SIGINT handling for proper shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = db;