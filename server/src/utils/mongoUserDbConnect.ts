import mongoose from "mongoose";
import { Connection } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const mongoUserDbConnect = () => {
  try {
    const mongoUri = process.env.MONGO_DB_URI as string;
    if (!mongoUri) {
      throw new Error("DB_URI does not exist in environment variable");
    }

    const conn: Connection = mongoose.createConnection(mongoUri);
    return { conn };
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorList: string[] = [];

      for (const e in error.errors) {
        errorList.push(error.errors[e]?.message);
      }

      console.error("Mongoose Error: ", errorList);
    } else {
      console.error("Ooops!, something out of normal flow happen :(");
    }
    return {};
  }
};

export default mongoUserDbConnect;
