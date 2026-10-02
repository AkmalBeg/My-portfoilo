import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("error connecting to mongodb:", error.message);
    process.exit(1);
  }
};

export default connectdb;
