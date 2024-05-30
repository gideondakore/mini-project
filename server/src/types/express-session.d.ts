import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user: { [key: string]: any };
    [key: string]: string;
    refreshToken: string;
  }
}

// export {};
