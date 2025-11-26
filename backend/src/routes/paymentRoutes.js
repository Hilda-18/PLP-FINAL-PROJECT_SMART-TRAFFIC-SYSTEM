import express from 'express';
import DarajaService from '../services/DarajaService.js';
import { authRequired } from '../middleware/authMiddleware.js';

const paymentsRoutes = express.Router();
const daraja = new DarajaService();

// initiate STK Push
paymentsRoutes.post('/stkpush', authRequired, async (req, res) => {
  try {
    if (!daraja.isConfigured) return res.status(503).json({ error: 'Daraja is not configured on the server' });
    const { amount, phone, accountRef, description, orderId } = req.body;
    if (!amount || !phone) return res.status(400).json({ error: 'amount and phone are required' });
    const result = await daraja.initiateStkPush({ amount, phone, accountRef, description, orderId });
    res.json(result);
  } catch (err) {
    console.error('stkpush error', err);
    res.status(500).json({ error: err.message });
  }
});

// callback endpoint to receive Daraja responses (should be publicly accessible)
paymentsRoutes.post('/callback', express.json(), (req, res) => {
  console.log('Daraja callback received', JSON.stringify(req.body).slice(0,1000));
  res.status(200).json({ result: 'received' });
});

export default paymentsRoutes;
