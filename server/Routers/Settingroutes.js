import express from "express";
import protect from "../Middleware/Authcontroller.js";
import upload from "../Middleware/upload.js";
import {
  getAbout, updateAbout,
  getProjects, addProject, updateProject, deleteProject,
  getSkills, addSkill, updateSkill, deleteSkill,
  uploadImage,
} from "../Controllers/Settingcontroller.js";

const settingrouter = express.Router();

// About
settingrouter.get("/about", getAbout);
settingrouter.put("/about", protect, updateAbout);

// Projects
settingrouter.get("/projects", getProjects);
settingrouter.post("/projects", protect, addProject);
settingrouter.put("/projects/:id", protect, updateProject);
settingrouter.delete("/projects/:id", protect, deleteProject);

// Skills
settingrouter.get("/skills", getSkills);
settingrouter.post("/skills", protect, addSkill);
settingrouter.put("/skills/:id", protect, updateSkill);
settingrouter.delete("/skills/:id", protect, deleteSkill);

// Image upload (for project images)
settingrouter.post("/upload", protect, upload.single("image"), uploadImage);

export default settingrouter;
