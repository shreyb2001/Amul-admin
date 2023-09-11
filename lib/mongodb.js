// db/db.js

import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default dbConnect;
