import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const mongoUserDbConnect = () => {
  try {
    const mongoUri = process.env.MONGO_DB_URI as string;
    if (!mongoUri) {
      throw new Error("DB_URI does not exist in environment variable");
    }

    const conn = mongoose.createConnection(mongoUri);
    return { conn };
  } catch (error) {
    throw new Error("Unable to connect database");
  }
};

export default mongoUserDbConnect;
