import User from '../models/User.model.js';
import Post from '../models/Post.model.js';
import Job from '../models/Job.model.js';

export const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const totalPosts = await Post.countDocuments();
        const reportedPosts = await Post.countDocuments({ isReported: true });
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ isActive: true });

        res.json({
            totalUsers,
            activeUsers,
            totalPosts,
            reportedPosts,
            totalJobs,
            activeJobs
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20, search } = req.query;
        const skip = (page - 1) * limit;

        const query = {};
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') }
            ];
        }

        const users = await User.find(query)
            .select('-password -resetPasswordToken -resetPasswordExpire')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({
            users,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}`, isActive: user.isActive });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getReportedPosts = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ isReported: true })
            .populate('author', 'name profilePicture')
            .populate('reports.user', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Post.countDocuments({ isReported: true });

        res.json({
            posts,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReportedPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const dismissReport = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.isReported = false;
        post.reports = [];
        await post.save();

        res.json({ message: 'Report dismissed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const moderateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { isActive } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        job.isActive = isActive;
        await job.save();

        res.json({ message: `Job ${isActive ? 'activated' : 'deactivated'}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
