import jwt from "jsonwebtoken";
import Admin from "../Models/Admin.js";

const generateToken = (adminId) =>
  jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/user/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: String(email).toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({ token: generateToken(admin._id), email: admin.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/user/me  (lets the frontend check if a saved token is still valid)
export const getMe = (req, res) => res.json({ email: req.admin.email });
