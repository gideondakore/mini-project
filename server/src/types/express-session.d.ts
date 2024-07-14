import "express-session";
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
    user_email_verification_data: {
      id?: string;
      name: string;
      email: string;
      password: string;
      birth_day?: string;
    };
  }
}

// export {};
