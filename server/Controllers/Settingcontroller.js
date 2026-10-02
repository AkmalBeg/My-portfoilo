import About from "../Models/About.js";
import Project from "../Models/Project.js";
import Skill from "../Models/Skill.js";

const pick = (obj, keys) =>
  Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]));

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: "Server error" });
};

/* ================= ABOUT ================= */

// GET /api/about   (public)
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    return res.json(about || { bio: "", highlights: [] });
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/about   (admin) - creates it the first time, updates it after that
export const updateAbout = async (req, res) => {
  try {
    const data = pick(req.body, ["bio", "highlights"]);
    if (!data.bio) return res.status(400).json({ message: "Bio is required" });

    const about = await About.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    return res.json({ message: "About section updated successfully", about });
  } catch (error) {
    return handleError(res, error);
  }
};

/* ================= PROJECTS ================= */

const projectFields = ["title", "role", "description", "image", "demoLink", "codeLink", "order"];

// GET /api/projects   (public)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    return handleError(res, error);
  }
};

// POST /api/projects   (admin)
export const addProject = async (req, res) => {
  try {
    const project = await Project.create(pick(req.body, projectFields));
    return res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/projects/:id   (admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      pick(req.body, projectFields),
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.json({ message: "Project updated successfully", project });
  } catch (error) {
    return handleError(res, error);
  }
};

// DELETE /api/projects/:id   (admin)
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    return handleError(res, error);
  }
};

/* ================= SKILLS ================= */

const skillFields = ["name", "icon", "level"];

// GET /api/skills   (public)
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    return res.json(skills);
  } catch (error) {
    return handleError(res, error);
  }
};

// POST /api/skills   (admin)
export const addSkill = async (req, res) => {
  try {
    const skill = await Skill.create(pick(req.body, skillFields));
    return res.status(201).json({ message: "Skill added successfully", skill });
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/skills/:id   (admin)
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      pick(req.body, skillFields),
      { new: true, runValidators: true }
    );
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    return res.json({ message: "Skill updated successfully", skill });
  } catch (error) {
    return handleError(res, error);
  }
};

// DELETE /api/skills/:id   (admin)
export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    return res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return handleError(res, error);
  }
};

/* ================= IMAGE UPLOAD ================= */

// POST /api/upload   (admin) - form-data field name: "image"
export const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  return res.status(201).json({ url });
};
