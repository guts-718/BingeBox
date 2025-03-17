import { v2 as cloudinary } from "cloudinary";
import { ENV_VARS } from "./confVars.js";
export const cloudinary_config = async () => {
  cloudinary.config({
    cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_VARS.CLOUDINARY_API_KEY,
    api_secret: ENV_VARS.CLOUDINARY_API_SECRET,
  });
};
