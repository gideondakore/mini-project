// // Import the 'express' module along with 'Request' and 'Response' types from express
// import express, { Request, Response } from "express";

// // Create an Express application
// const app = express();

// // Specify the port number for the server
// const port: number = 5500;

// // Define a route for the root path ('/')
// app.get("/", (req: Request, res: Response) => {
//   // Send a response to the client
//   res.send("Hello, TypeScript + Node.js + Express!");
// });

// // Start the server and listen on the specified port
// app.listen(port, () => {
//   // Log a message when the server is successfully running
//   console.log(`Server is running on http://localhost:${port}`);
// });

import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CALLBACK_URL = "http%3A//localhost:8000/google/callback";

const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",

  "https%3A//www.googleapis.com/auth/userinfo.profile",
];

app.get("/", async (req: Request, res: Response) => {
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

const PORT = process.env.PORT || 5500;

const start = async (port: string | number) => {
  app.listen(port, () => {
    console.log(`Listen on port ${PORT}`);
  });
};

start(PORT);
