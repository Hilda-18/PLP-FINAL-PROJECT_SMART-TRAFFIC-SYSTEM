import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const CLERK_JWT_SECRET = process.env.CLERK_JWT_KEY || null; // If using Clerk, provide the JWT verification key here

function tryVerifyLocal(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function tryVerifyClerk(token) {
  if (!CLERK_JWT_SECRET) return null;
  try {
    return jwt.verify(token, CLERK_JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid token format' });
  const token = parts[1];

  // try local JWT first
  const local = tryVerifyLocal(token);
  if (local) {
    req.user = local;
    req.authProvider = 'local';
    return next();
  }

  // try Clerk token if configured
  const clerk = tryVerifyClerk(token);
  if (clerk) {
    req.user = clerk;
    req.authProvider = 'clerk';
    return next();
  }

  return res.status(401).json({ error: 'Invalid token' });
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    // allow admin always
    if (req.user.role === 'admin') return next();
    if (req.user.role !== role) return res.status(403).json({ error: 'Insufficient role' });
    return next();
  };
}
