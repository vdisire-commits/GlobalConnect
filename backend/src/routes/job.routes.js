import express from 'express';
import { createJob, getJobs, getJobById, applyToJob, updateApplicationStatus, saveJob, getSavedJobs, getRecommendedJobs } from '../controllers/job.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { jobValidation, validate } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/', protect, jobValidation, validate, createJob);
router.get('/', protect, getJobs);
router.get('/saved', protect, getSavedJobs);
router.get('/recommended', protect, getRecommendedJobs);
router.get('/:jobId', protect, getJobById);
router.post('/:jobId/apply', protect, applyToJob);
router.put('/:jobId/applicant/:applicantId', protect, updateApplicationStatus);
router.post('/:jobId/save', protect, saveJob);

export default router;
