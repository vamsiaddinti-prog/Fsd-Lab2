import mongoose from "mongoose";

const connectDB = async (mongoUri, dbName) => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: dbName,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;