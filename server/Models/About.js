import mongoose from "mongoose";

// Only one About document exists (the controller upserts it).
// "highlights" = the 3 cards on the right side of your About section.
const AboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true, trim: true },
    highlights: [
      {
        value: { type: Number, default: 0 },          // the "0+" counter
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
      },
    ],
  },
  { timestamps: true }
);

const About = mongoose.model("About", AboutSchema);
export default About;
