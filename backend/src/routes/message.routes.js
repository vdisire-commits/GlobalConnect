import express from 'express';
import { sendMessage, getConversation, getConversations, markAsRead } from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getConversation);
router.put('/:userId/read', protect, markAsRead);

export default router;
