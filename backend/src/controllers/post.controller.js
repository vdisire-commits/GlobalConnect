import Post from '../models/Post.model.js';
import User from '../models/User.model.js';
import { uploadToCloudinary } from '../services/storage.service.js';
import { createNotification } from '../services/notification.service.js';

export const createPost = async (req, res) => {
    try {
        const { content, visibility } = req.body;

        let mediaUrl = null;
        let mediaType = null;

        if (req.file) {
            mediaUrl = await uploadToCloudinary(req.file, 'globalconnect/posts');

            if (req.file.mimetype.startsWith('image')) {
                mediaType = 'image';
            } else if (req.file.mimetype.startsWith('video')) {
                mediaType = 'video';
            } else {
                mediaType = 'document';
            }
        }

        const post = await Post.create({
            author: req.user._id,
            content,
            media: mediaUrl,
            mediaType,
            visibility: visibility || 'public'
        });

        const populatedPost = await Post.findById(post._id)
            .populate('author', 'name profilePicture headline');

        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getFeed = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const user = await User.findById(req.user._id);
        const connectionIds = user.connections;

        const posts = await Post.find({
            $or: [
                { author: { $in: [...connectionIds, req.user._id] } },
                { visibility: 'public' }
            ]
        })
            .populate('author', 'name profilePicture headline')
            .populate('comments.user', 'name profilePicture')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Post.countDocuments({
            $or: [
                { author: { $in: [...connectionIds, req.user._id] } },
                { visibility: 'public' }
            ]
        });

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

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ author: userId })
            .populate('author', 'name profilePicture headline')
            .populate('comments.user', 'name profilePicture')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Post.countDocuments({ author: userId });

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

export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const alreadyLiked = post.likes.includes(req.user._id);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            post.likes.push(req.user._id);

            if (post.author.toString() !== req.user._id.toString()) {
                await createNotification({
                    recipient: post.author,
                    sender: req.user._id,
                    type: 'post_like',
                    content: `${req.user.name} liked your post`,
                    link: `/post/${post._id}`
                });
            }
        }

        await post.save();

        res.json({ likes: post.likes, liked: !alreadyLiked });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({
            user: req.user._id,
            text
        });

        await post.save();

        if (post.author.toString() !== req.user._id.toString()) {
            await createNotification({
                recipient: post.author,
                sender: req.user._id,
                type: 'post_comment',
                content: `${req.user.name} commented on your post`,
                link: `/post/${post._id}`
            });
        }

        const populatedPost = await Post.findById(post._id)
            .populate('comments.user', 'name profilePicture');

        res.json(populatedPost.comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Post.findByIdAndDelete(postId);

        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const reportPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { reason } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.reports.push({
            user: req.user._id,
            reason
        });

        if (post.reports.length >= 3) {
            post.isReported = true;
        }

        await post.save();

        res.json({ message: 'Post reported' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
