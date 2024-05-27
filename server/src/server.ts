import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import User from "./models/user.model";
import cors from "cors";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { access } from "fs";

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
app.use(cookieParser(process.env.COOKIES_SECRET_KEY));
// app.use(
//   sessions({
//     secret: process.env.JWT_SECRET as string,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL as string;
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL as string;
const FRONTEND_URL = "http://localhost:3000";

//Verifying token
const verifyAccessToken = async (token: string) => {
  try {
    const verify_access_token_response = await fetch(
      `${GOOGLE_TOKEN_INFO_URL}?access_token=${token}`
    );
    // console.log("From verify token: ", response.ok);
    const verify_access_token_data = await verify_access_token_response.json();

    return { verify_access_token_data, verify_access_token_response };
  } catch (error) {
    console.error(error);
  }
};

//Refresh token for new access token
const tokenRefresh = async (refreshToken: string) => {
  const data: any = {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  try {
    const refresh_token_response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const refresh_token_data = await refresh_token_response.json();

    return { refresh_token_data, refresh_token_response };
  } catch (error) {
    console.log(error);
  }
};

//session validation using cookies
app.use(async (req: Request, res: Response, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  try {
    const verify_access_token = await verifyAccessToken(accessToken);

    const verify_access_token_data =
      verify_access_token?.verify_access_token_data;
    const verify_access_token_response =
      verify_access_token?.verify_access_token_response;

    // console.log(refreshToken);

    if (verify_access_token_response?.ok) {
      next();
    }

    if (refreshToken === undefined) {
      return res.status(verify_access_token_response?.status as number).json({
        message: verify_access_token_response?.statusText,
        status: verify_access_token_response?.status,
      });
    }

    const new_access_token_data = await tokenRefresh(refreshToken);
    const refresh_token_data = new_access_token_data?.refresh_token_data;
    const refresh_token_response =
      new_access_token_data?.refresh_token_response;

    if (!refresh_token_response?.ok) {
      return res.status(refresh_token_response?.status as number).json({
        message: refresh_token_response?.statusText,
        status: refresh_token_response?.status,
      });
    }

    console.log("From middle ware: ");

    const { access_token, expires_in } = refresh_token_data;
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: expires_in * 1000,
    });

    const access_token_response = await verifyAccessToken(access_token);

    const access_token_data = access_token_response?.verify_access_token_data;

    console.log(
      "Refresh token: ",
      refresh_token_data,
      " Access token: ",
      access_token,
      " Access Token Data",
      access_token_data
    );

    next();
  } catch (error) {
    console.error(`Error occur in the Middle ware: ${error}`);
  }
});

//Google  Oauth call back url
app.get("/google/callback", async (req: Request, res: Response) => {
  interface GoogleOAuthData {
    code: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    grant_type: string;
  }

  const code = req.query.code as string;

  const data: GoogleOAuthData = {
    code,
    client_id: GOOGLE_CLIENT_ID as string,
    client_secret: GOOGLE_CLIENT_SECRET as string,
    redirect_uri: "http://localhost:8000/google/callback",
    grant_type: "authorization_code",
  };

  try {
    const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const access_token_data = await response.json();

    const { access_token, refresh_token, id_token, expires_in } =
      access_token_data;

    console.log("ACCESS TOKEN DATA: ", access_token_data);

    const token_info_response = await fetch(
      `${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
    );

    const token_info_data = await token_info_response.json();

    const { email, name } = token_info_data;
    let user = await User.findOne({ email }).select("-password");
    if (!user) {
      user = await User.create({ name, email });
    }

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: expires_in * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.redirect(FRONTEND_URL);
  } catch (error) {
    console.error("ErroreExchanging authentication code for token: ", error);
    res.status(500).send("Authentication failed");
  }
});

app.get("/api/test", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  const accessToken = req.cookies.access_token;

  res.json({ refreshToken: refreshToken, accessToken: accessToken });
});

const PORT = process.env.PORT || 5500;

const start = (port: string | number) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start(PORT);
