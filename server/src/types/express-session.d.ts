import session from "express-session";
import mongoose from "mongoose";

declare module "express-session" {
  interface SessionData {
    user: {
      id?: mongoose.Types.ObjectId;
      name?: string;
      email?: string;
    };
    refreshToken: string;
    accessToken: string;
  }
}

// export {};
