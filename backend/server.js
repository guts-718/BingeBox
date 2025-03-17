import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();

app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("hey there");
});
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
});
