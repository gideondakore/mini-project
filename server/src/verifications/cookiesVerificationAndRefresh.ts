import { Request, Response, NextFunction } from "express";
import verifyAccessToken from "./verifyAccessToken";
import tokenRefresh from "./tokenRefresh";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
const mongoClient = new MongoClient(
  "mongodb+srv://zedcurl1:8vu3UFpUsknGZbr2@merncrud.h6dnvjx.mongodb.net/?retryWrites=true&w=majority&appName=merncrud"
);

const cookieVerificationAndRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dbNameSession = "SessionVerification";
  const collectionNameSession = "userSessionVerification";
  try {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    const authHeader = req.headers["authorization"];
    const tokens = authHeader && authHeader.split(" ")[1].split(",");
    const credential_access_token = tokens?.at(0)?.trim();
    const credential_refresh_token = tokens?.at(1)?.trim();

    if (accessToken || refreshToken) {
      const verify_access_token = await verifyAccessToken(accessToken);
      const verify_access_token_response =
        verify_access_token?.verify_access_token_response;
      if (verify_access_token_response?.ok) {
        return next();
      }

      if (refreshToken === undefined) {
        return res.status(verify_access_token_response?.status as number).json({
          authenticated: verify_access_token_response?.ok,
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
          authenticated: refresh_token_response?.ok,
          message: refresh_token_response?.statusText,
          status: refresh_token_response?.status,
        });
      }

      const { access_token, expires_in } = refresh_token_data;
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: expires_in * 1000,
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return next();
    } else {
      //Credential Verification logic
      if (
        credential_access_token !== "null" &&
        credential_refresh_token !== "null"
      ) {
        try {
          let decodeStateAcess: boolean = false;

          jwt.verify(
            credential_refresh_token?.trim() as string,
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
            (error) => {
              if (error) {
                decodeStateAcess = false;
              } else {
                decodeStateAcess = true;
              }
            }
          );

          if (decodeStateAcess) {
            return res.status(200).json({
              authenticated: true,
              message: "Valid user",
              status: 200,
            });
          }

          try {
            await mongoClient.connect();
            const db = mongoClient.db(dbNameSession);
            const collection = db.collection(collectionNameSession);
            const result = await collection.findOne({
              access_token: credential_access_token,
              refresh_token: credential_refresh_token,
            });

            if (result) {
              const { access_token, refresh_token, payload } = result;

              if (credential_refresh_token === refresh_token) {
                let session_bool = false;
                let jsonValue;

                jwt.verify(
                  credential_refresh_token as string,
                  process.env.JWT_REFRESH_TOKEN_SECRET as string,
                  (err, user) => {
                    if (err) {
                      session_bool = false;
                    }
                    jsonValue = user;
                    session_bool = true;
                  }
                );

                if (!session_bool) {
                  return res.status(403).json({
                    authenticated: false,
                    message: "Invalid token!",
                    status: 403,
                  });
                }

                if (typeof jsonValue === "string") {
                  return res.status(500).json({
                    authenticated: false,
                    message: "Invalid token payload!",
                    status: 500,
                  });
                }

                const new_access_token = jwt.sign(
                  payload,
                  process.env.JWT_ACCESS_TOKEN_SECRET as string,
                  { expiresIn: process.env.JWT_LIFETIME as string }
                );

                const new_refresh_token = jwt.sign(
                  payload,
                  process.env.JWT_REFRESH_TOKEN_SECRET as string
                );

                const filter = {
                  access_token: access_token,
                  refresh_token: refresh_token,
                };
                const update = {
                  $set: {
                    access_token: new_access_token,
                    refresh_token: new_refresh_token,
                    payload: payload,
                    updateAt: new Date(),
                  },
                };
                collection.findOneAndUpdate(filter, update);

                return res.status(200).json({
                  authenticated: true,
                  message: "success",
                  status: 200,
                  credential_access_token: req.session.accessToken,
                  credential_refresh_token: req.session.refreshToken,
                });
              } else {
                return res.status(401).json({
                  authenticated: false,
                  message: "No valid token provided",
                  status: 401,
                });
              }
            } else {
              return res.status(401).json({
                authenticated: false,
                message: "No valid token provided",
                status: 401,
              });
            }
          } catch (error) {
            return res.status(403).json({
              authenticated: false,
              message: "Invalid token!",
              status: 403,
            });
          }
        } catch (error) {
          console.error("Token verification error", error);
          return res.status(500).json({
            authenticated: false,
            message: "Internal server error",
            status: 500,
          });
        }
      } else {
        return res.status(401).json({
          authenticated: false,
          message: "No valid token provided",
          status: 401,
        });
      }
    }
  } catch (error) {
    console.error(`Error occur in the Middleware: ${error}`);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
};

export default cookieVerificationAndRefresh;
