import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

//console.log("🧠 MONGO_URI:", process.env.MONGO_URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
