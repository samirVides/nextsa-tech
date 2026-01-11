import express from 'express';
import { subscribe, getAllSubscribers, deleteSubscriber } from '../controllers/newsletterController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', subscribe); // Público
router.get('/', protect, admin, getAllSubscribers); // Solo Admin
router.delete('/:id', protect, admin, deleteSubscriber); // Solo Admin

export default router;