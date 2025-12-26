import User from '../models/User.model.js';
import { uploadToCloudinary } from '../services/storage.service.js';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -resetPasswordToken -resetPasswordExpire')
            .populate('connections', 'name profilePicture headline')
            .populate('connectionRequests.from', 'name');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, bio, headline, location, website, skills, experience, education } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (headline !== undefined) user.headline = headline;
        if (location !== undefined) user.location = location;
        if (website !== undefined) user.website = website;
        if (skills) user.skills = skills;
        if (experience) user.experience = experience;
        if (education) user.education = education;

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = await uploadToCloudinary(req.file, 'globalconnect/profiles');

        const user = await User.findById(req.user._id);
        user.profilePicture = imageUrl;
        await user.save();

        res.json({ profilePicture: imageUrl });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const uploadBannerImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = await uploadToCloudinary(req.file, 'globalconnect/banners');

        const user = await User.findById(req.user._id);
        user.bannerImage = imageUrl;
        await user.save();

        res.json({ bannerImage: imageUrl });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { query, skills, location, page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const searchQuery = { isActive: true };

        if (query) {
            searchQuery.$text = { $search: query };
        }

        if (skills) {
            searchQuery.skills = { $in: skills.split(',') };
        }

        if (location) {
            searchQuery.location = new RegExp(location, 'i');
        }

        const users = await User.find(searchQuery)
            .select('name profilePicture headline location skills')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(searchQuery);

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

export const getSuggestedConnections = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const suggested = await User.find({
            _id: { $nin: [...user.connections, user._id] },
            isActive: true,
            $or: [
                { skills: { $in: user.skills } },
                { location: user.location }
            ]
        })
            .select('name profilePicture headline location')
            .limit(10);

        res.json(suggested);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
