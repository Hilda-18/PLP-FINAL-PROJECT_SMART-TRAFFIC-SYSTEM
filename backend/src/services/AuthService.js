import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export default class AuthService {
  async register(username, password, role = 'operator') {
    const existing = await User.findOne({ username });
    if (existing) throw new Error('User exists');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, passwordHash: hash, role });
    return { id: user._id, username: user.username, role: user.role };
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    const token = jwt.sign({ sub: user._id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token, user: { id: user._id, username: user.username, role: user.role } };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}
