import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'operator', 'viewer'], default: 'operator' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
