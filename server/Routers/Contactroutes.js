import express from "express";
import rateLimit from "express-rate-limit";
import protect from "../Middleware/Authcontroller.js";
import { sendMessage, getMessages, markRead, deleteMessage } from "../Controllers/Contactcontroller.js";

const contactrouter = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages, please try again later" },
});

contactrouter.post("/", contactLimiter, sendMessage);
contactrouter.get("/", protect, getMessages);
contactrouter.patch("/:id/read", protect, markRead);
contactrouter.delete("/:id", protect, deleteMessage);

export default contactrouter;
