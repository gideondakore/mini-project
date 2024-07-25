import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "cors";
import express from "express";
dotenv.config();

interface CorsOptions {
  origin: string;
  methods: string;
  credentials: boolean;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: `${process.env.LOCAL_HOST_CLIENT}`,
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SendMailResult {
  tempData: any;
  token: string;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const sendMail = async (
  email: string,
  password: string
): Promise<SendMailResult> => {
  const MAIL_TOKEN = process.env.MAIL_TOKEN as string;

  const auth = {
    host: "smtp.gmail.com",
    port: 587,
    secure: process.env.NODE_ENV === "production",
    auth: {
      user: "armstrongspycon27@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(auth);

  const token = jwt.sign({ email, password }, MAIL_TOKEN, {
    expiresIn: "24h",
  });

  const templatePath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "emailTemplate.html")
      : path.join(__dirname, "emailTemplate.html");
  // const templatePath = path.resolve(__dirname, "emailTemplate.html");

  try {
    console.log("Dir name: ", path.join(__dirname, "/emailTemplate.html"));
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    const client = process.env.LOCAL_HOST_CLIENT as string;

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
    let tempData: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = (attempt: number) => Math.pow(2, attempt) * 1000;

    const sendMailWithRetry = (): Promise<SendMailResult> => {
      return new Promise((resolve, reject) => {
        const attemptSendMail = () => {
          transporter.sendMail(mailOption, (error, data) => {
            console.log("Error: ", error, " : ", "Data: ", data);
            if (error) {
              if (attempts < maxAttempts) {
                attempts++;
                console.log(
                  `Attempt ${attempts} failed. Retrying in ${retryDelay(attempts)} ms...`
                );
                setTimeout(attemptSendMail, retryDelay(attempts));
              } else {
                tempData = undefined;
                reject({ tempData, token });
              }
            } else {
              console.log("error, ", error);
              tempData = data;
              resolve({ tempData, token });
            }
          });
        };
        attemptSendMail();
      });
    };

    return sendMailWithRetry();
  } catch (error) {
    console.error("Error reading email template:", error);
    throw error;
  }
};

export default sendMail;
