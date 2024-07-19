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
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoUserDbConnect_1 = __importDefault(require("../utils/mongoUserDbConnect"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 56,
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        minlength: 6,
        required: false,
    },
    birthday: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;
UserSchema.methods.generateToken = function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id, email: this.email, name: this.name }, JWT_ACCESS_SECRET, {
        expiresIn: JWT_LIFETIME,
    });
    return token;
};
const { conn } = (0, mongoUserDbConnect_1.default)();
let User = (mongoose_1.Model);
if (conn) {
    User = conn.models.User || conn.model("User", UserSchema);
}
else {
    console.error("Failed to connect to the database");
    throw new Error("Database connection failed");
}
exports.default = User;
