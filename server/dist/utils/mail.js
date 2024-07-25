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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const corsOptions = {
    origin: `${process.env.LOCAL_HOST_CLIENT}`,
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true,
    optionsSuccessStatus: 200,
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions));
/* eslint-enable @typescript-eslint/no-explicit-any */
const sendMail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const MAIL_TOKEN = process.env.MAIL_TOKEN;
    const auth = {
        host: "smtp.gmail.com",
        port: 587,
        secure: process.env.NODE_ENV === "production",
        auth: {
            user: "armstrongspycon27@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    };
    const transporter = nodemailer_1.default.createTransport(auth);
    const token = jsonwebtoken_1.default.sign({ email, password }, MAIL_TOKEN, {
        expiresIn: "24h",
    });
    const templatePath = path_1.default.join(__dirname, "emailTemplate.html");
    const htmlTemplate = fs_1.default.readFileSync(templatePath, "utf-8");
    // const htmlContent = htmlTemplate.replace("{{token}}", token);
    const client = process.env.LOCAL_HOST_CLIENT || "https://mini-project-gid.vercel.app";
    const htmlContent = htmlTemplate
        .replace("{{client}}", client)
        .replace("{{token}}", token);
    const mailOption = {
        from: "armstrongspycon27@gmail.com",
        to: email,
        subject: "Welcome to Duplex",
        html: htmlContent,
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let tempData;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = (attempt) => Math.pow(2, attempt) * 1000;
    const sendMailWithRetry = () => {
        return new Promise((resolve, reject) => {
            const attemptSendMail = () => {
                transporter.sendMail(mailOption, (error, data) => {
                    if (error) {
                        if (attempts < maxAttempts) {
                            attempts++;
                            console.log(`Attempt ${attempts} failed. Retrying in ${retryDelay(attempts)} ms...`);
                            setTimeout(attemptSendMail, retryDelay(attempts));
                        }
                        else {
                            tempData = undefined;
                            console.log("Error :", error);
                            reject({ tempData, token });
                        }
                    }
                    else {
                        tempData = data;
                        resolve({ tempData, token });
                    }
                });
            };
            attemptSendMail();
        });
    };
    return sendMailWithRetry();
});
exports.default = sendMail;
