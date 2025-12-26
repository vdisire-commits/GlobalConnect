import express from 'express';
import { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, removeConnection, getConnections, getConnectionRequests } from '../controllers/connection.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/request/:userId', protect, sendConnectionRequest);
router.post('/accept/:userId', protect, acceptConnectionRequest);
router.post('/reject/:userId', protect, rejectConnectionRequest);
router.delete('/:userId', protect, removeConnection);
router.get('/requests', protect, getConnectionRequests);
router.get('/:userId?', protect, getConnections);

export default router;
