import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import User from "./models/user.model";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import verifyAccessToken from "./verifications/verifyAccessToken";
import cookieVerificationAndRefresh from "./verifications/cookiesVerificationAndRefresh";
import getUserProfile from "./utils/getUserProfile";
import checkPasswordValidity from "./validations/checkPasswordValidity";
import getUser from "./utils/getUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import axios from "axios";

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
app.use(cookieParser(process.env.COOKIES_SECRET_KEY as string));
app.use(
  session({
    secret: process.env.SESSION_SECRET_TOKEN as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://zedcurl1:8vu3UFpUsknGZbr2@merncrud.h6dnvjx.mongodb.net/sessionStore?retryWrites=true&w=majority&appName=merncrud",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

// const ngrok_forward_uri = "https://1e3d-154-161-15-37.ngrok-free.app";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL as string;
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL as string;
const FRONTEND_URL = "http://localhost:3000";

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
    redirect_uri: `http://localhost:8000/google/callback`,
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

    const token_info_response = await fetch(
      `${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
    );

    const token_info_data = await token_info_response.json();

    const { email, name, picture } = token_info_data;
    let user = await User.findOne({ email }).select("-password");
    if (!user) {
      user = await User.create({ name, email, picture: picture });
    }

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expires_in * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.redirect(FRONTEND_URL);
  } catch (error) {
    console.error("ErroreExchanging authentication code for token: ", error);
    return res.status(500).send("Authentication failed");
  }
});

app.get("/api/test", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  const accessToken = req.cookies.access_token;

  return res.json({ refreshToken: refreshToken, accessToken: accessToken });
});

app.get(
  "/authentication-status",
  cookieVerificationAndRefresh,
  async (req: Request, res: Response) => {
    try {
      const { access_token } = req.cookies;
      const access_token_response = await verifyAccessToken(access_token);
      const response = access_token_response?.verify_access_token_response;

      if (!response?.ok) {
        return res
          .status(response?.status as number)
          .json({ authenticated: response?.ok, message: "error" });
      }

      return res
        .status(response?.status as number)
        .json({ authenticated: response?.ok, message: "success" });
    } catch (error) {
      console.error("Error checking for authenticated status");
    }
  }
);

app.get("/signout", async (req: Request, res: Response) => {
  try {
    let deleteSuccess: boolean = false;
    req.session.destroy((err) => {
      if (err) {
        deleteSuccess = true;
        return;
      }
      return;
    });

    if (deleteSuccess) {
      return res
        .status(500)
        .json({ message: "Logout failed", status: 500, success: false });
    }

    res.clearCookie("connect.sid");
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res
      .status(200)
      .json({ message: "success", status: 200, success: true });
  } catch (error) {
    console.error(`error occur while signing out: ${error}`);
  }
});

//OAuth user profile pic generator
app.get("/user-profile", async (req: Request, res: Response) => {
  try {
    const { access_token } = req.cookies;
    const userProfile = await getUserProfile(access_token);

    const { verify_access_token_data } = userProfile!;
    const { email } = verify_access_token_data;
    const user = await User.findOne({ email: email }).select("-password");
    res.status(200).json({ picture: user?.picture });
  } catch (error) {
    console.error("Error occur in user-profile response handler");
  }
});

//////////////////// CREDENTIALS FUNCTIONALITY ////////////////////////

//Credential login
app.post("/credential-register", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { fullname, email, birthDate, password, confirmPassword } = body;
    const validEmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const validatedCredentials: string[] = [];

    if (password && password === confirmPassword) {
      validatedCredentials.push(...checkPasswordValidity(password));
    } else {
      validatedCredentials.push("Valid passwords must be provided");
    }

    if (email) {
      if (!validEmailRegex.test(email)) {
        validatedCredentials.unshift("Invalid email");
      }
    } else {
      validatedCredentials.unshift("Valid email must be provided");
    }

    if (
      Array.isArray(validatedCredentials) &&
      validatedCredentials.length === 0
    ) {
      const { message, success, user } = (await getUser(email, fullname))!;

      if (!success) {
        return res
          .status(201)
          .json({ message: message, success: success, user: user });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const dbUser = await User.create({
        name: fullname,
        email: email,
        password: hashedPassword,
        birthday: birthDate,
      });

      req.session.user = {
        id: dbUser?._id,
        name: dbUser?.name,
        email: dbUser.email,
      };

      const payload = {
        id: dbUser._id,
        email: dbUser.email,
        name: dbUser.name,
      };
      const jwtRefreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;
      if (dbUser) {
        const accessToken = dbUser.generateToken();
        const refreshToken = jwt.sign(payload, jwtRefreshSecret);
        req.session.refreshToken = refreshToken;

        return res.status(200).json({
          message: [message],
          success: success,
          credential_access_token: accessToken,
          credential_refresh_token: refreshToken,
        });
      }

      return res
        .status(500)
        .json({ message: ["Internal server error"], success: false });
    }
  } catch (error) {
    console.error("Error handling user credentials body!");
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };

      const new_access_token = jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      );
      const new_refresh_token = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET as string
      );

      if (new_access_token && new_refresh_token) {
        req.session.user = payload;
        req.session.refreshToken = new_refresh_token;
        req.session.accessToken = new_access_token;
        return res.status(200).json({
          message: ["Sign in successful"],
          success: true,
          status: 200,
          access_token: new_access_token,
          refresh_token: new_refresh_token,
        });
      } else {
        return res.status(500).json({
          message: ["Unexpected error occured :( . Try again later!"],
          success: false,
          status: 500,
        });
      }
    } else {
      return res.status(500).json({
        message: ["Invalid email or password!"],
        success: false,
        status: 500,
      });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorList: string[] = [];

      for (const e in error.errors) {
        errorList.push(error.errors[e]?.message);
      }
      return res
        .status(404)
        .json({ message: errorList, success: false, status: 500 });
    } else {
      res.status(404).json({
        message: ["Ooops!, unable to sign you in"],
        success: false,
        status: 500,
      });
    }
  }
});

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

app.get("/maps-api", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`
    );

    // console.log("Response from Map API: ", response);
    res.setHeader("Content-Type", "text/javascript");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching the Google Maps API:", error);
    res.status(500).send("Error fetching the Google Maps API");
  }
});

// app.get("/maps-api", async (req: Request, res: Response) => {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       res.status(500).send("Network error fetching the Google Maps API");
//     }
//     // console.log(response);

//     const data = await response.;
//     console.log("DATA: ", data);
//     res.setHeader("Content-Type", "text/javascript");
//     res.send(data);
//   } catch (error) {
//     res.status(500).send("Error fetching the Google Maps API");
//   }
// });

const PORT = process.env.PORT || 5500;

const start = (port: string | number) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start(PORT);
