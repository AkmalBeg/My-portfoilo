import mongoose from "mongoose";

// Matches SkillCard.jsx: icon component, name, level (number shown as %)
// "icon" stores the react-icons name, e.g. "SiReact". The frontend maps it to the component.
const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;
