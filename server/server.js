import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectdb from "./config/db.js";
import userrouter from "./Routers/Userroutes.js";
import settingrouter from "./Routers/Settingroutes.js";
import contactrouter from "./Routers/Contactroutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.json({ message: "Portfolio API running" }));

app.use("/api/user", userrouter);
app.use("/api/contact", contactrouter);
app.use("/api", settingrouter); // /api/about, /api/projects, /api/skills, /api/upload

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || (err.name === "MulterError" ? 400 : 500);
  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? "Server error" : err.message });
});

const PORT = process.env.PORT || 5000;
await connectdb();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
