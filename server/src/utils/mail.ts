import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import mailGun from "nodemailer-mailgun-transport";
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

interface SendMailResult {
  tempData: any;
  token: string;
}

const sendMail = async (
  email: string,
  password: string
): Promise<SendMailResult> => {
  const MAIL_TOKEN = process.env.MAIL_TOKEN as string;
  const auth = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "armstrongspycon27@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(auth);

  const token = jwt.sign({ email: email, password: password }, MAIL_TOKEN, {
    expiresIn: "24h",
  });

  const templatePath = path.join(__dirname, "emailTemplate.html");
  // console.log(templatePath);
  const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
  // console.log(htmlTemplate);

  const htmlContent = htmlTemplate.replace("{{token}}", token);
  // console.log(htmlContent);

  const mailOption = {
    from: "armstrongspycon27@gmail.com",
    to: email,
    subject: "Welcome to Duplex",
    html: htmlContent,
  };

  let tempData;
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (error, data) => {
      if (error) {
        tempData = undefined;
        reject({ tempData, token });
      } else {
        tempData = data;
        resolve({ tempData, token });
      }
    });
  });
};

export default sendMail;
