import express from 'express';
import { createPost, getFeed, getUserPosts, likePost, commentOnPost, deletePost, reportPost } from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import { postValidation, validate } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/', protect, upload.single('media'), postValidation, validate, createPost);
router.get('/feed', protect, getFeed);
router.get('/user/:userId', protect, getUserPosts);
router.post('/:postId/like', protect, likePost);
router.post('/:postId/comment', protect, commentOnPost);
router.post('/:postId/report', protect, reportPost);
router.delete('/:postId', protect, deletePost);

export default router;
