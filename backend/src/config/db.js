import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-traffic';
    await mongoose.connect(uri);
    if (process.env.NODE_ENV !== "production") {
      const timestamp = new Date().toISOString();
      process.stdout.write(`[${timestamp}] MongoDB connected\n`);
    }
  } catch (err) {
    const timestamp = new Date().toISOString();
    process.stderr.write(`[${timestamp}] MongoDB connection failed: ${err.message}\n`);
    process.exit(1);
  }
}
