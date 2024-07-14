import mongoose, { Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import mongoUserDbConnect from "../utils/mongoUserDbConnect";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthday?: string;
  picture?: string;
  generateToken: () => string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!;
const JWT_LIFETIME = process.env.JWT_LIFETIME!;

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, email: this.email, name: this.name },
    JWT_ACCESS_SECRET,
    {
      expiresIn: JWT_LIFETIME,
    }
  );
  return token;
};

const { conn } = mongoUserDbConnect();

let User = Model<IUser>;
if (conn) {
  User = conn.models.User || conn.model("User", UserSchema);
} else {
  console.error("Failed to connect to the database");
  throw new Error("Database connection failed");
}

export default User;
