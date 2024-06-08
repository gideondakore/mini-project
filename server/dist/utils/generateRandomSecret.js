"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const generateRandomSecrets = (length) => {
    return (0, crypto_1.randomBytes)(length).toString("base64").slice(0, length);
};
exports.default = generateRandomSecrets;
