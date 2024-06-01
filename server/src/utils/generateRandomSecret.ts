import { randomBytes } from "crypto";

const generateRandomSecrets = (length: number): string => {
  return randomBytes(length).toString("base64").slice(0, length);
};

export default generateRandomSecrets;
