"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("./models/user.model"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const verifyAccessToken_1 = __importDefault(require("./verifications/verifyAccessToken"));
const cookiesVerificationAndRefresh_1 = __importDefault(require("./verifications/cookiesVerificationAndRefresh"));
const getUserProfile_1 = __importDefault(require("./utils/getUserProfile"));
const checkPasswordValidity_1 = __importDefault(require("./validations/checkPasswordValidity"));
const getUser_1 = __importDefault(require("./utils/getUser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
// import { Server } from "socket.io";
// import { createServer } from "http";
dotenv.config();
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true,
    optionsSuccessStatus: 200,
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)(process.env.COOKIES_SECRET_KEY));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb+srv://zedcurl1:8vu3UFpUsknGZbr2@merncrud.h6dnvjx.mongodb.net/sessionStore?retryWrites=true&w=majority&appName=merncrud",
    }),
    cookie: {
        secure: false,
        httpOnly: true,
    },
}));
// const ngrok_forward_uri = "https://1e3d-154-161-15-37.ngrok-free.app";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL;
const FRONTEND_URL = "http://localhost:3000";
//Google  Oauth call back url
app.get("/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const data = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `http://localhost:8000/google/callback`,
        grant_type: "authorization_code",
    };
    try {
        const response = yield fetch(GOOGLE_ACCESS_TOKEN_URL, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const access_token_data = yield response.json();
        const { access_token, refresh_token, id_token, expires_in } = access_token_data;
        const token_info_response = yield fetch(`${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
        const token_info_data = yield token_info_response.json();
        const { email, name, picture } = token_info_data;
        let user = yield user_model_1.default.findOne({ email }).select("-password");
        if (!user) {
            user = yield user_model_1.default.create({ name, email, picture: picture });
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
    }
    catch (error) {
        console.error("ErroreExchanging authentication code for token: ", error);
        return res.status(500).send("Authentication failed");
    }
}));
app.get("/api/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refresh_token;
    const accessToken = req.cookies.access_token;
    return res.json({ refreshToken: refreshToken, accessToken: accessToken });
}));
app.get("/authentication-status", cookiesVerificationAndRefresh_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token } = req.cookies;
        const access_token_response = yield (0, verifyAccessToken_1.default)(access_token);
        const response = access_token_response === null || access_token_response === void 0 ? void 0 : access_token_response.verify_access_token_response;
        if (!(response === null || response === void 0 ? void 0 : response.ok)) {
            return res
                .status(response === null || response === void 0 ? void 0 : response.status)
                .json({ authenticated: response === null || response === void 0 ? void 0 : response.ok, message: "error" });
        }
        return res
            .status(response === null || response === void 0 ? void 0 : response.status)
            .json({ authenticated: response === null || response === void 0 ? void 0 : response.ok, message: "success" });
    }
    catch (error) {
        console.error("Error checking for authenticated status");
    }
}));
app.get("/signout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deleteSuccess = false;
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
    }
    catch (error) {
        console.error(`error occur while signing out: ${error}`);
    }
}));
//OAuth user profile pic generator
app.get("/user-profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token } = req.cookies;
        const userProfile = yield (0, getUserProfile_1.default)(access_token);
        const { verify_access_token_data } = userProfile;
        const { email } = verify_access_token_data;
        const user = yield user_model_1.default.findOne({ email: email }).select("-password");
        res.status(200).json({ user: user });
    }
    catch (error) {
        console.error("Error occur in user-profile response handler");
    }
}));
//////////////////// CREDENTIALS FUNCTIONALITY ////////////////////////
//Credential login
app.post("/credential-register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { fullname, email, birthDate, password, confirmPassword } = body;
        const validEmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        const validatedCredentials = [];
        if (password && password === confirmPassword) {
            validatedCredentials.push(...(0, checkPasswordValidity_1.default)(password));
        }
        else {
            validatedCredentials.push("Valid passwords must be provided");
        }
        if (email) {
            if (!validEmailRegex.test(email)) {
                validatedCredentials.unshift("Invalid email");
            }
        }
        else {
            validatedCredentials.unshift("Valid email must be provided");
        }
        if (Array.isArray(validatedCredentials) &&
            validatedCredentials.length === 0) {
            const { message, success, user } = (yield (0, getUser_1.default)(email, fullname));
            if (!success) {
                return res
                    .status(201)
                    .json({ message: message, success: success, user: user });
            }
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            const dbUser = yield user_model_1.default.create({
                name: fullname,
                email: email,
                password: hashedPassword,
                birthday: birthDate,
            });
            req.session.user = {
                id: dbUser === null || dbUser === void 0 ? void 0 : dbUser._id,
                name: dbUser === null || dbUser === void 0 ? void 0 : dbUser.name,
                email: dbUser.email,
            };
            const payload = {
                id: dbUser._id,
                email: dbUser.email,
                name: dbUser.name,
            };
            const jwtRefreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
            if (dbUser) {
                const accessToken = dbUser.generateToken();
                const refreshToken = jsonwebtoken_1.default.sign(payload, jwtRefreshSecret);
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
    }
    catch (error) {
        console.error("Error handling user credentials body!");
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (user && bcryptjs_1.default.compareSync(password, user.password)) {
            const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
            };
            const new_access_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET);
            const new_refresh_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);
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
            }
            else {
                return res.status(500).json({
                    message: ["Unexpected error occured :( . Try again later!"],
                    success: false,
                    status: 500,
                });
            }
        }
        else {
            return res.status(500).json({
                message: ["Invalid email or password!"],
                success: false,
                status: 500,
            });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const errorList = [];
            for (const e in error.errors) {
                errorList.push((_a = error.errors[e]) === null || _a === void 0 ? void 0 : _a.message);
            }
            return res
                .status(404)
                .json({ message: errorList, success: false, status: 500 });
        }
        else {
            res.status(404).json({
                message: ["Ooops!, unable to sign you in"],
                success: false,
                status: 500,
            });
        }
    }
}));
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
app.get("/maps-api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`);
        // console.log("Response from Map API: ", response);
        res.setHeader("Content-Type", "text/javascript");
        res.send(response.data);
    }
    catch (error) {
        console.error("Error fetching the Google Maps API:", error);
        res.status(500).send("Error fetching the Google Maps API");
    }
}));
//CHATENGINE.IO
app.post("/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    try {
        const r = yield axios_1.default.put("https://api.chatengine.io/users/", {
            username: username,
            secret: username,
        }, {
            headers: { "private-key": process.env.CHAT_ENGINE_IO_SECRET },
        });
        return res.status(r.status).json(r.data);
    }
    catch (error) {
        console.log(error);
        // return res.status(error?.response.status).json(error?.response.data);
    }
}));
const PORT = process.env.PORT || 5500;
const start = (port) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};
start(PORT);
