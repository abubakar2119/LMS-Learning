import db from "mongoose";

require("dotenv").config();

const connectDB = async () => {
  try {
    await db.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
}

export default connectDB;