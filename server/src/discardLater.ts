import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import verifyAccessToken from "./verifyAccessToken";
import tokenRefresh from "./tokenRefresh";

// session validation using cookies
const cookieVerificationAndRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    const authHeader = req.headers["authorization"];
    const tokens = authHeader && authHeader.split(" ")[1].split(",");
    const credential_access_token = tokens?.at(0);
    const credential_refresh_token = tokens?.at(1);

    console.log(
      `Received tokens - Access: ${credential_access_token}, Refresh: ${credential_refresh_token}`
    );

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
      if (
        credential_access_token !== "null" &&
        credential_refresh_token !== "null"
      ) {
        try {
          jwt.verify(
            credential_access_token as string,
            process.env.JWT_ACCESS_TOKEN_SECRET as string,
            (err, user) => {
              if (err) {
                console.error("Access Token Verification Error:", err);
                return res.status(403).json({
                  authenticated: false,
                  message: "Invalid access token",
                  status: 403,
                });
              }

              console.log("Access token verified successfully");
              // return next();
              return res.status(200).json({
                authenticated: true,
                message: "Successful login",
                status: 200,
              });
            }
          );

          if (credential_refresh_token === req.session.refreshToken) {
            jwt.verify(
              credential_refresh_token as string,
              process.env.JWT_REFRESH_TOKEN_SECRET as string,
              (err, user) => {
                if (err) {
                  return res.status(403).json({
                    authenticated: false,
                    message: "User not logged in!",
                    status: 403,
                  });
                }

                if (typeof user === "string") {
                  return res.status(500).json({
                    authenticated: false,
                    message: "Invalid token payload!",
                    status: 500,
                  });
                }

                const payload = {
                  id: (user as JwtPayload)?.id,
                  email: (user as JwtPayload)?.email,
                  name: (user as JwtPayload)?.name,
                };

                const new_access_token = jwt.sign(
                  payload,
                  process.env.JWT_ACCESS_TOKEN_SECRET as string,
                  { expiresIn: process.env.JWT_LIFETIME as string }
                );

                const new_refresh_token = jwt.sign(
                  payload,
                  process.env.JWT_REFRESH_TOKEN_SECRET as string
                );
                req.session.refreshToken = new_refresh_token;

                return res.status(200).json({
                  authenticated: true,
                  message: "Success",
                  status: 200,
                  credential_access: new_access_token,
                  credential_refresh: new_refresh_token,
                });
              }
            );
          } else {
            return res.status(403).json({
              authenticated: false,
              message: "Invalid refresh token",
              status: 403,
            });
          }
        } catch (error) {
          console.error("Token verification error:", error);
          return res.status(500).json({
            authenticated: false,
            message: "Internal server error",
            status: 500,
          });
        }
      } else {
        return res.status(401).json({
          authenticated: false,
          message: "No valid tokens provided",
          status: 401,
        });
      }

      return next();
    }
  } catch (error) {
    console.error(`Error occurred in the middleware: ${error}`);
    return res.status(500).json({
      authenticated: false,
      message: "Internal server error",
      status: 500,
    });
  }
};

// export default cookieVerificationAndRefresh;
