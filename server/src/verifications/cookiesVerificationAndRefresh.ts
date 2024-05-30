import express, { Request, Response, NextFunction } from "express";
import verifyAccessToken from "./verifyAccessToken";
import tokenRefresh from "./tokenRefresh";
import jwt from "jsonwebtoken";

//session validation using cookies
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

    if (accessToken || refreshToken) {
      const verify_access_token = await verifyAccessToken(accessToken);
      const verify_access_token_response =
        verify_access_token?.verify_access_token_response;
      if (verify_access_token_response?.ok) {
        return next();
      }

      console.log("------------------------------------------");
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
      if (credential_access_token || credential_refresh_token) {
        if (
          credential_access_token !== null ||
          credential_access_token !== undefined
        ) {
          jwt.verify(
            credential_access_token as string,
            process.env.JWT_ACCESS_TOKEN_SECRET!,
            (err, user) => {
              if (err) {
                return;
              }
              return next();
            }
          );
        }

        if (
          (credential_refresh_token !== null ||
            credential_refresh_token !== undefined) &&
          credential_refresh_token === req.session.refreshToken
        ) {
          jwt.verify(
            credential_refresh_token as string,
            process.env.JWT_REFRESH_TOKEN_SECRET!,
            (err, user) => {
              if (err) {
                return res.status(403).json({
                  authenticated: false,
                  message: "User not login!",
                  status: 403,
                });
              }

              const payload = {
                id: req.session.id,
                email: req.session.email,
                name: req.session.name,
              };
              const new_access_token = jwt.sign(
                payload,
                process.env.SESSION_SECRET_TOKEN!,
                { expiresIn: "15s" }
              );
              return res.status(200).json({
                authenticated: true,
                message: "success",
                credential_access_token: new_access_token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.error(`Error occur in the Middle ware: ${error}`);
  }
};

export default cookieVerificationAndRefresh;
