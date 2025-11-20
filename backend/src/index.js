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

app.use('/api/traffic', trafficRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentsRoutes);

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

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
