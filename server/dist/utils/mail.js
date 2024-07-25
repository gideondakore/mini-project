"use strict";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import path from "path";
// import fs from "fs";
// import cors from "cors";
// import express from "express";
// dotenv.config();
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
// interface CorsOptions {
//   origin: string;
//   methods: string;
//   credentials: boolean;
//   optionsSuccessStatus: number;
// }
// const corsOptions: CorsOptions = {
//   origin: `${process.env.LOCAL_HOST_CLIENT}`,
//   methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
// /* eslint-disable @typescript-eslint/no-explicit-any */
// interface SendMailResult {
//   tempData: any;
//   token: string;
// }
// /* eslint-enable @typescript-eslint/no-explicit-any */
// const sendMail = async (
//   email: string,
//   password: string
// ): Promise<SendMailResult> => {
//   const MAIL_TOKEN = process.env.MAIL_TOKEN as string;
//   console.log("Mail Token: ", MAIL_TOKEN);
//   const auth = {
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: process.env.NODE_ENV === "production",
//     auth: {
//       user: "armstrongspycon27@gmail.com",
//       pass: process.env.GMAIL_APP_PASSWORD,
//     },
//   };
//   console.log("Mail Token Auth: ", auth);
//   const transporter = nodemailer.createTransport(auth);
//   const token = jwt.sign({ email, password }, MAIL_TOKEN, {
//     expiresIn: "24h",
//   });
//   const templatePath = path.join(__dirname, "emailTemplate.html");
//   console.log("Template Path: ", templatePath);
//   console.log("Template Path Second: ", fs.readFileSync(templatePath, "utf-8"));
//   const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
//   console.log("HTML Template: ", htmlTemplate);
//   // const htmlContent = htmlTemplate.replace("{{token}}", token);
//   const client = process.env.LOCAL_HOST_CLIENT as string;
//   console.log("CLIENT: ", client);
//   const htmlContent = htmlTemplate
//     .replace("{{client}}", client)
//     .replace("{{token}}", token);
//   console.log("HTML Content: ", htmlContent);
//   const mailOption = {
//     from: "armstrongspycon27@gmail.com",
//     to: email,
//     subject: "Welcome to Duplex",
//     html: htmlContent,
//   };
//   console.log("MAIL OPTIONS: ", mailOption);
//   /* eslint-disable @typescript-eslint/no-explicit-any */
//   let tempData: any;
//   /* eslint-enable @typescript-eslint/no-explicit-any */
//   let attempts = 0;
//   const maxAttempts = 5;
//   const retryDelay = (attempt: number) => Math.pow(2, attempt) * 1000;
//   const sendMailWithRetry = (): Promise<SendMailResult> => {
//     return new Promise((resolve, reject) => {
//       const attemptSendMail = () => {
//         transporter.sendMail(mailOption, (error, data) => {
//           if (error) {
//             if (attempts < maxAttempts) {
//               attempts++;
//               console.log(
//                 `Attempt ${attempts} failed. Retrying in ${retryDelay(attempts)} ms...`
//               );
//               setTimeout(attemptSendMail, retryDelay(attempts));
//             } else {
//               tempData = undefined;
//               console.log("Error :", error);
//               reject({ tempData, token });
//             }
//           } else {
//             console.log("Success: ");
//             tempData = data;
//             resolve({ tempData, token });
//           }
//         });
//       };
//       attemptSendMail();
//     });
//   };
//   return sendMailWithRetry();
// };
// export default sendMail;
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
const sendMail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const MAIL_TOKEN = process.env.MAIL_TOKEN;
    console.log("Mail Token: ", MAIL_TOKEN);
    const auth = {
        host: "smtp.gmail.com",
        port: 587,
        secure: process.env.NODE_ENV === "production",
        auth: {
            user: "armstrongspycon27@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    };
    console.log("Mail Token Auth: ", auth);
    const transporter = nodemailer_1.default.createTransport(auth);
    const token = jsonwebtoken_1.default.sign({ email, password }, MAIL_TOKEN, {
        expiresIn: "24h",
    });
    const templatePath = path_1.default.resolve(__dirname, "emailTemplate.html");
    console.log("Template Path: ", templatePath);
    try {
        const htmlTemplate = fs_1.default.readFileSync(templatePath, "utf-8");
        console.log("HTML Template: ", htmlTemplate);
        const client = process.env.LOCAL_HOST_CLIENT;
        console.log("CLIENT: ", client);
        const htmlContent = htmlTemplate
            .replace("{{client}}", client)
            .replace("{{token}}", token);
        console.log("HTML Content: ", htmlContent);
        const mailOption = {
            from: "armstrongspycon27@gmail.com",
            to: email,
            subject: "Welcome to Duplex",
            html: htmlContent,
        };
        console.log("MAIL OPTIONS: ", mailOption);
        let tempData;
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
                            console.log("Success: ");
                            tempData = data;
                            resolve({ tempData, token });
                        }
                    });
                };
                attemptSendMail();
            });
        };
        return sendMailWithRetry();
    }
    catch (error) {
        console.error("Error reading email template:", error);
        throw error;
    }
});
exports.default = sendMail;
