import Message from "../Models/Message.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact   (public) - the Contact form
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    await Message.create({ name, email, message });
    return res.status(201).json({ message: "Thanks! Your message has been sent." });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/contact   (admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/contact/:id/read   (admin)
export const markRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ message: "Message not found" });
    return res.json(msg);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE /api/contact/:id   (admin)
export const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    return res.json({ message: "Message deleted" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
