import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import User from "./models/user.model";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import verifyAccessToken from "./verifications/verifyAccessToken";
import cookieVerificationAndRefresh from "./verifications/cookiesVerificationAndRefresh";
import getUserProfile from "./utils/getUserProfile";
import checkPasswordValidity from "./validations/checkPasswordValidity";
import getUser from "./utils/getUser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "console";
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
app.use(
  session({
    secret: process.env.SESSION_SECRET_TOKEN as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

const ngrok_forward_uri = "https://1e3d-154-161-15-37.ngrok-free.app";
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
    console.log("TOKEN INFO: ", token_info_data);

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

app.get("/oauth-logout", async (req: Request, res: Response) => {
  try {
    const access_token = req.cookies["access_token"];
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ msg: "success", status: 200 });
  } catch (error) {
    console.error(`error occur while signing out: ${error}`);
  }
});

//OAuth user profile pic generator
app.get("/user-profile", async (req: Request, res: Response) => {
  try {
    const { access_token } = req.cookies;
    // console.log("ACCESS TOKEN: ", access_token);
    const userProfile = await getUserProfile(access_token);

    const { verify_access_token_data, verify_access_token_response } =
      userProfile!;
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
    const { fullname, email, birthDate, password } = body;
    const validEmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    let validatedCredentials: string[] = [];

    if (password) {
      validatedCredentials.push(...checkPasswordValidity(password));
    } else {
      validatedCredentials.push("Valid password must be provided");
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

      // console.log(message, success, user);
      if (!success) {
        return res
          .status(201)
          .json({ message: message, success: success, user: user });
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);
      const dbUser = await User.create({
        name: fullname,
        email: email,
        password: hashedPassword,
        birthday: birthDate,
      });

      req.session.id = dbUser._id;
      req.session.name = dbUser.name;
      req.session.email = dbUser.email;

      const payload = {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
      };
      const jwtRefreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;
      // console.log("DB user: ", dbUser);
      if (dbUser) {
        const accessToken = dbUser.generateToken();
        const refreshToken = jwt.sign(payload, jwtRefreshSecret);
        //TODO: I have to store the refresh token for later use
        req.session.refreshToken = refreshToken;
        // console.log("Access token generator", accessToken);
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

// ////////////////////////////////////////////////
////////////////// JWT AUTHENTICATIONS //////////

//generating access token
interface DBUser {
  _id: string;
  name: string;
  email: string;
}
const generateAccessToken = (user: DBUser) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  const option = { expiresIn: "10m" };
  return jwt.sign(payload, jwtAccessSecret, option);
};

//verifying access token
// const verifyJwtAccessToken = (token: string) => {
//   const jwtSecret = process.env.JWT_SECRET as string;

//   try {
//     const decoded = jwt.verify(token, jwtSecret, (err, payload) => {
//       if (err) {
//         return { success: false, error: error };
//       }
//     });

//     return { success: true, data: decoded };
//   } catch (error) {
//     return { success: false, error: error };
//   }
// };

//Authenticate jwt token
// const authenticateJwtToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   const result = verifyJwtAccessToken(token);

//   if (!result.success) {
//     return res.status(403).json({ error: result.error });
//   }

//   req.user = result.data;
//   next();
// };

app.post("/credential-refresh-token", async (req: Request, res: Response) => {
  const refreshToken = req.body.credential_access_token;
  if (refreshToken === null) {
    return res.sendStatus(401);
  }

  if (refreshToken !== req.body.refreshToken) {
    return res.sendStatus(403);
  }
});
const PORT = process.env.PORT || 5500;

const start = (port: string | number) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start(PORT);
