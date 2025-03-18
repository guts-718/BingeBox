import express from "express";
import { Signup, Login, Logout, authCheck } from "../controllers/auth.controller.js";
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/login", Login);

router.post("/signup", Signup);
router.post("/logout", Logout);

router.get("/authCheck",protectRoute, authCheck);
export default router;

