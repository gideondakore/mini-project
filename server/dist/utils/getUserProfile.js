"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAccessToken_1 = __importDefault(require("../verifications/verifyAccessToken"));
const getUserProfile = (token) => {
    try {
        const userProfile = (0, verifyAccessToken_1.default)(token);
        return userProfile;
    }
    catch (error) {
        console.error("Error fetching user profile");
    }
};
exports.default = getUserProfile;
