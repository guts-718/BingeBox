import express from "express";
import { Signup, Login, Logout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", Login);

router.post("/signup", Signup);
router.post("/logout", Logout);

export default router;
