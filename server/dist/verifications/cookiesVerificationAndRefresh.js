"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAccessToken_1 = __importDefault(require("./verifyAccessToken"));
const tokenRefresh_1 = __importDefault(require("./tokenRefresh"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//session validation using cookies
const cookieVerificationAndRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;
        const authHeader = req.headers["authorization"];
        const tokens = authHeader && authHeader.split(" ")[1].split(",");
        const credential_access_token = tokens === null || tokens === void 0 ? void 0 : tokens.at(0);
        const credential_refresh_token = tokens === null || tokens === void 0 ? void 0 : tokens.at(1);
        if (accessToken || refreshToken) {
            const verify_access_token = yield (0, verifyAccessToken_1.default)(accessToken);
            const verify_access_token_response = verify_access_token === null || verify_access_token === void 0 ? void 0 : verify_access_token.verify_access_token_response;
            if (verify_access_token_response === null || verify_access_token_response === void 0 ? void 0 : verify_access_token_response.ok) {
                return next();
            }
            if (refreshToken === undefined) {
                return res.status(verify_access_token_response === null || verify_access_token_response === void 0 ? void 0 : verify_access_token_response.status).json({
                    authenticated: verify_access_token_response === null || verify_access_token_response === void 0 ? void 0 : verify_access_token_response.ok,
                    message: verify_access_token_response === null || verify_access_token_response === void 0 ? void 0 : verify_access_token_response.statusText,
                    status: verify_access_token_response === null || verify_access_token_response === void 0 ? void 0 : verify_access_token_response.status,
                });
            }
            const new_access_token_data = yield (0, tokenRefresh_1.default)(refreshToken);
            const refresh_token_data = new_access_token_data === null || new_access_token_data === void 0 ? void 0 : new_access_token_data.refresh_token_data;
            const refresh_token_response = new_access_token_data === null || new_access_token_data === void 0 ? void 0 : new_access_token_data.refresh_token_response;
            if (!(refresh_token_response === null || refresh_token_response === void 0 ? void 0 : refresh_token_response.ok)) {
                return res.status(refresh_token_response === null || refresh_token_response === void 0 ? void 0 : refresh_token_response.status).json({
                    authenticated: refresh_token_response === null || refresh_token_response === void 0 ? void 0 : refresh_token_response.ok,
                    message: refresh_token_response === null || refresh_token_response === void 0 ? void 0 : refresh_token_response.statusText,
                    status: refresh_token_response === null || refresh_token_response === void 0 ? void 0 : refresh_token_response.status,
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
        }
        else {
            if (credential_access_token !== "null" &&
                credential_refresh_token !== "null") {
                try {
                    let decodeStateAcess = false;
                    // let decodeStateRefresh: boolean = false;
                    jsonwebtoken_1.default.verify(credential_access_token === null || credential_access_token === void 0 ? void 0 : credential_access_token.trim(), process.env.JWT_ACCESS_TOKEN_SECRET, (error) => {
                        if (error) {
                            return;
                        }
                        decodeStateAcess = true;
                        return;
                    });
                    if (decodeStateAcess) {
                        return res.status(200).json({
                            authenticated: true,
                            message: "Valid user",
                            status: 200,
                        });
                    }
                    if (credential_refresh_token === req.session.refreshToken) {
                        jsonwebtoken_1.default.verify(credential_refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
                            if (err) {
                                return res.status(403).json({
                                    authenticated: false,
                                    message: "Invalid token!",
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
                                id: user === null || user === void 0 ? void 0 : user.id,
                                email: user === null || user === void 0 ? void 0 : user.email,
                                name: user === null || user === void 0 ? void 0 : user.name,
                            };
                            const new_access_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_LIFETIME });
                            const new_refresh_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);
                            req.session.refreshToken = new_refresh_token;
                            req.session.accessToken = new_access_token;
                            // decodeStateRefresh = true;
                            return;
                        });
                        return res.status(200).json({
                            authenticated: true,
                            message: "success",
                            status: 200,
                            credential_access: req.session.accessToken,
                            credential_refresh: req.session.refreshToken,
                        });
                    }
                    else {
                        return res.status(401).json({
                            authenticated: false,
                            message: "No valid token provided",
                            status: 401,
                        });
                    }
                }
                catch (error) {
                    console.error("Token verification error", error);
                    return res.status(500).json({
                        authenticated: false,
                        message: "Internal server error",
                        status: 500,
                    });
                }
            }
            else {
                return res.status(401).json({
                    authenticated: false,
                    message: "No valid token provided",
                    status: 401,
                });
            }
        }
    }
    catch (error) {
        console.error(`Error occur in the Middle ware: ${error}`);
    }
});
exports.default = cookieVerificationAndRefresh;
