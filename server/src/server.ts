import * as dotenv from "dotenv";
import express, { Request, Response, urlencoded } from "express";
import User from "./models/user.model";
import cors from "cors";

dotenv.config();

interface CorsOptions {
  origin: string;
  methods: string;
  credentials: boolean;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL as string;
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL as string;

interface GoogleOAuthData {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
}

app.get("/google/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  const data: GoogleOAuthData = {
    code,
    client_id: GOOGLE_CLIENT_ID as string,
    client_secret: GOOGLE_CLIENT_SECRET as string,
    redirect_uri: "http://localhost:8000/google/callback",
    grant_type: "authorization_code",
  };

  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();

  const { id_token } = access_token_data;

  const token_info_response = await fetch(
    `${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );

  const token_info_data = await token_info_response.json();

  const { email, name } = token_info_data;
  let user = await User.findOne({ email }).select("-password");
  if (!user) {
    user = await User.create({ name, email });
  }
  const token = user.generateToken();
  console.log(user, token);
  res.status(token_info_response.status).json({ user, token });
});

const PORT = process.env.PORT || 5500;

const start = (port: string | number) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start(PORT);
