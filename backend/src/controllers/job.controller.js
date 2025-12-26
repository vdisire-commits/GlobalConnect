import Job from '../models/Job.model.js';
import User from '../models/User.model.js';
import { createNotification } from '../services/notification.service.js';

export const createJob = async (req, res) => {
    try {
        const { title, company, description, location, jobType, experienceLevel, skills, salary, expiresAt } = req.body;

        const job = await Job.create({
            postedBy: req.user._id,
            title,
            company,
            description,
            location,
            jobType,
            experienceLevel,
            skills,
            salary,
            expiresAt
        });

        const populatedJob = await Job.findById(job._id)
            .populate('postedBy', 'name profilePicture company');

        res.status(201).json(populatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getJobs = async (req, res) => {
    try {
        const { query, location, jobType, experienceLevel, skills, page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const searchQuery = { isActive: true };

        if (query) {
            searchQuery.$text = { $search: query };
        }

        if (location) {
            searchQuery.location = new RegExp(location, 'i');
        }

        if (jobType) {
            searchQuery.jobType = jobType;
        }

        if (experienceLevel) {
            searchQuery.experienceLevel = experienceLevel;
        }

        if (skills) {
            searchQuery.skills = { $in: skills.split(',') };
        }

        const jobs = await Job.find(searchQuery)
            .populate('postedBy', 'name profilePicture')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Job.countDocuments(searchQuery);

        res.json({
            jobs,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId)
            .populate('postedBy', 'name profilePicture company')
            .populate('applicants.user', 'name profilePicture headline');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { coverLetter } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const alreadyApplied = job.applicants.some(
            app => app.user.toString() === req.user._id.toString()
        );

        if (alreadyApplied) {
            return res.status(400).json({ message: 'Already applied to this job' });
        }

        job.applicants.push({
            user: req.user._id,
            coverLetter,
            status: 'pending'
        });

        await job.save();

        await createNotification({
            recipient: job.postedBy,
            sender: req.user._id,
            type: 'job_application',
            content: `${req.user.name} applied to your job posting: ${job.title}`,
            link: `/jobs/${job._id}`
        });

        res.json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { jobId, applicantId } = req.params;
        const { status } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const applicant = job.applicants.find(
            app => app.user.toString() === applicantId
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }

        applicant.status = status;
        await job.save();

        await createNotification({
            recipient: applicantId,
            sender: req.user._id,
            type: 'job_update',
            content: `Your application for ${job.title} has been ${status}`,
            link: `/jobs/${job._id}`
        });

        res.json({ message: 'Application status updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const user = await User.findById(req.user._id);
        const alreadySaved = user.savedJobs.includes(jobId);

        if (alreadySaved) {
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        } else {
            user.savedJobs.push(jobId);
        }

        await user.save();

        res.json({ saved: !alreadySaved });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'savedJobs',
                populate: { path: 'postedBy', select: 'name profilePicture' }
            });

        res.json(user.savedJobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRecommendedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const recommended = await Job.find({
            isActive: true,
            $or: [
                { skills: { $in: user.skills } },
                { location: user.location }
            ]
        })
            .populate('postedBy', 'name profilePicture')
            .limit(10);

        res.json(recommended);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
