import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import trafficRoutes from './routes/trafficRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentsRoutes from './routes/paymentRoutes.js';
import Simulator from './services/Simulator.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Smart Traffic System Backend is running.');
});

app.use('/api/traffic', trafficRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentsRoutes);

// lightweight health endpoint
app.get('/api/health', async (req, res) => {
  // quick check DB connection state from mongoose
  const readyState = mongoose.connection.readyState; // 1 = connected
  const dbConnected = readyState === 1;
  res.json({ ok: true, dbConnected });
});

io.on('connection', socket => {
  console.log('client connected', socket.id);
  socket.emit('connected', { message: 'welcome' });
  socket.on('disconnect', () => console.log('client disconnected', socket.id));
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log('MongoDB connected');

    const sim = new Simulator(io);
    sim.start();

    // install a server error handler (e.g., port busy)
    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Another process may be running (PID ${process.pid}).`);
        console.error('Use: netstat -ano | findstr :5000  (Windows) to find PID, then: taskkill /PID <pid> /F');
      } else {
        console.error('Server error', err);
      }
      process.exit(1);
    });

    server.listen(PORT, () => console.log(`Server running on port ${PORT} (PID ${process.pid})`));
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
