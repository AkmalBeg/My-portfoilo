import Admin from "../Models/Admin.js";


// Generate JWT Token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//login Admin
const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(admin._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};