import express from 'express';
import { getUserProfile, updateProfile, uploadProfilePicture, uploadBannerImage, searchUsers, getSuggestedConnections } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/search', protect, searchUsers);
router.get('/suggested', protect, getSuggestedConnections);
router.get('/:id', protect, getUserProfile);
router.put('/profile', protect, updateProfile);
router.post('/profile-picture', protect, upload.single('image'), uploadProfilePicture);
router.post('/banner-image', protect, upload.single('image'), uploadBannerImage);

export default router;
