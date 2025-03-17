import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from "./config/confVars.js";

const app = express();
app.use(express.json()); // helps us to parse request body...
app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("hey there");
});
const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
  connectDB();
});
