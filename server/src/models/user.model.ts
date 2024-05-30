import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import mongoUserDbConnect from "../utils/mongoUserDbConnect";

const UserSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, email: this.email, name: this.name },
    JWT_SECRET,
    {
      expiresIn: JWT_LIFETIME,
    }
  );
  return token;
};

const { conn } = mongoUserDbConnect();

const User = conn.models.User || conn.model("User", UserSchema);

export default User;
