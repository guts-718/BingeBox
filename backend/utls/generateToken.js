import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/confVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
  res.cookie("jwt-bingebox", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // to prevent XSS attacks cross-site scripting attacks- make it inaccessible by java_script
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};
