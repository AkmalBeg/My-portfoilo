import express from "express";
import rateLimit from "express-rate-limit";
import protect from "../Middleware/Authcontroller.js";
import { loginAdmin, getMe } from "../Controllers/Usercontroller.js";

const userrouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, try again later" },
});

userrouter.post("/login", loginLimiter, loginAdmin);
userrouter.get("/me", protect, getMe);

export default userrouter;
