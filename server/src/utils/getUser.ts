import express, { Request, Response } from "express";
import User from "../models/user.model";

const getUser = async (email: string, name: string) => {
  try {
    const user = await User.findOne({ email }).select("-password");
    if (user) {
      return {
        message: `User with the same name ${name} and email '${email}' exist`,
        success: false,
        user: user,
      };
    }

    console.log("From getUser information: ", user);
    return { message: "User not found", success: true, user: user };
  } catch (error) {
    console.error(`Error occur accessing user from database`);
  }
};

export default getUser;
