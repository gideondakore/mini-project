// import express, { Request, Response } from "express";
import User from "../models/user.model";

const getUser = async (email: string) => {
  try {
    const user = await User.findOne({ email }).select("-password");
    // const user = await
    console.log("USER FROM GET USER", user);
    if (user) {
      return {
        message: [
          `User with the same email '${email}' exist. You can proceed to signin.`,
        ],
        success: false,
        user: user,
      };
    }

    return { message: ["User not found"], success: true, user: user };
  } catch (error) {
    console.error(`Error occur accessing user from database`);
  }
};

export default getUser;
