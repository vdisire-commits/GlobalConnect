import express from 'express';
import { getStats, getAllUsers, toggleUserStatus, getReportedPosts, deleteReportedPost, dismissReport, moderateJob } from '../controllers/admin.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.put('/users/:userId/toggle-status', toggleUserStatus);
router.get('/posts/reported', getReportedPosts);
router.delete('/posts/:postId', deleteReportedPost);
router.put('/posts/:postId/dismiss', dismissReport);
router.put('/jobs/:jobId/moderate', moderateJob);

export default router;
