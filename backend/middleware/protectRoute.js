import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV_VARS } from "../config/confVars.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-bingebox"];
    if (!token) {
      console.log("unauthorized user - token absent");
      return res.status(404).json({
        success: false,
        message: "token not present - so unauthorized",
      });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      console.log("invalid token");
      res
        .status(401)
        .json({ success: false, message: "unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    next();
  } catch (error) {
    console.log("internal server error inside the protectRoute");
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
export default protectRoute;
