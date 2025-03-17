import mongoose from "mongoose";
import { ENV_VARS } from "./confVars.js";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("database connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to database ", error);
  }
};
