import mongoose from "mongoose";

// Matches the props of your Card.jsx: image, title, role, description, demoLink, codeLink
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    role: { type: String, default: "", trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    demoLink: { type: String, default: "", trim: true },
    codeLink: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
