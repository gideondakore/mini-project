"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoUserDbConnect_1 = __importDefault(require("../utils/mongoUserDbConnect"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please provide a namw"],
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
const User = conn.models.User || conn.model("User", UserSchema);
exports.default = User;
