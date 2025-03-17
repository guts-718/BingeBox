import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { cloudinary_config } from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utls/generateToken.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Email or Password missing");
      return res
        .status(401)
        .json({ success: false, message: "Email or Password missing" });
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      console.log("invalid email");
      return res.status(401).json({ success: false, message: "invalid email" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("user does not exist");
      return res
        .status(401)
        .json({ success: false, message: "user does not exist" });
    }
    const storedPassword = user.password;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
      console.log("user or password incorrect");
      return res
        .status(401)
        .json({ success: false, message: "user or password incorrect" });
    }

    generateTokenAndSetCookie(user._id, res);
    user.password = "";
    res.status(200).json({
      success: true,
      message: "user Logged in  succesfully",
      data: user,
    });
  } catch (error) {
    console.log("Login failed, server error");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const Signup = async (req, res) => {
  try {
    cloudinary_config();
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      console.log("please provide all the fields");
      return res
        .status(401)
        .json({ success: false, message: "please provide all the fields" });
    }

    if (password.length < 6) {
      console.log("password needs to be atleast 6 chars long");
      return res.status(401).json({
        success: false,
        message: "password needs to be atleast 6 chars long",
      });
    }
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      console.log("invalid email");
      return res.status(401).json({ success: false, message: "invalid email" });
    }
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      console.log("username already exists");
      return res
        .status(401)
        .json({ success: false, message: "username already exists" });
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      console.log("username already exists");
      return res
        .status(401)
        .json({ success: false, message: "username already exists" });
    }
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "avatar3.png"];
    let index = Math.floor(Math.random() * 3);
    //"C:/Users/rahul/OneDrive/Desktop/projects111/BingeBox/frontend/public/avatar1.png"
    const image = `../BingeBox/frontend/public/${PROFILE_PICS[index]}`;
    const response = await cloudinary.uploader.upload(image);
    const img = response.secure_url;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      image: img,
    });
    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      user.password = "";
      res.status(200).json({
        success: true,
        message: "user created succesfully",
        data: user,
      });
    }
  } catch (error) {
    console.log("user not created..  error: ", error);
    return res.status(500).json({
      success: false,
      message: "user not created",
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt-bingebox");
    return res
      .status(200)
      .json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log("could not logout");
    res.status(400).json({ success: false, message: error.message });
  }
};
