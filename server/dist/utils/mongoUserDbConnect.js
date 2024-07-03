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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mongoUserDbConnect = () => {
    var _a;
    try {
        const mongoUri = process.env.MONGO_DB_URI;
        if (!mongoUri) {
            throw new Error("DB_URI does not exist in environment variable");
        }
        const conn = mongoose_1.default.createConnection(mongoUri);
        return { conn };
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const errorList = [];
            for (const e in error.errors) {
                errorList.push((_a = error.errors[e]) === null || _a === void 0 ? void 0 : _a.message);
            }
            console.error("Mongoose Error: ", errorList);
        }
        else {
            console.error("Ooops!, something out of normal flow happen :(");
        }
        return {};
    }
};
exports.default = mongoUserDbConnect;
