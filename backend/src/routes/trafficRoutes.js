import express from 'express';
import { getIntersections, getLights, patchLight, postIntersection } from '../controllers/trafficController.js';
import { authRequired, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/intersections', getIntersections);
router.post('/intersections', authRequired, requireRole('operator'), postIntersection);
router.get('/lights', getLights);
router.patch('/lights/:id', authRequired, requireRole('operator'), patchLight);

export default router;
