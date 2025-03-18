import express, { urlencoded } from "express";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import tvRoute from "./routes/tv.route.js";
import { ENV_VARS } from "./config/confVars.js";
import movieRoute from "./routes/movie.route.js";
import searchRoute from "./routes/search.route.js";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/protectRoute.js";

const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json()); // helps us to parse request body...
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);
app.get("/", (req, res) => {
  res.send("hey there");
});
const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
  connectDB();
});
