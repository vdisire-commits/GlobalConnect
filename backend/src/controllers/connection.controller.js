import User from '../models/User.model.js';
import { createNotification } from '../services/notification.service.js';

export const sendConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot send request to yourself' });
        }

        const targetUser = await User.findById(userId);

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const alreadyConnected = targetUser.connections.includes(req.user._id);
        if (alreadyConnected) {
            return res.status(400).json({ message: 'Already connected' });
        }

        const requestExists = targetUser.connectionRequests.some(
            req => req.from.toString() === req.user._id.toString()
        );

        if (requestExists) {
            return res.status(400).json({ message: 'Request already sent' });
        }

        targetUser.connectionRequests.push({ from: req.user._id });
        await targetUser.save();

        await createNotification({
            recipient: userId,
            sender: req.user._id,
            type: 'connection_request',
            content: `${req.user.name} sent you a connection request`,
            link: `/profile/${req.user._id}`
        });

        res.json({ message: 'Connection request sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.params;

        const currentUser = await User.findById(req.user._id);
        const requestIndex = currentUser.connectionRequests.findIndex(
            req => req.from.toString() === userId
        );

        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Request not found' });
        }

        currentUser.connectionRequests.splice(requestIndex, 1);
        currentUser.connections.push(userId);
        await currentUser.save();

        const otherUser = await User.findById(userId);
        otherUser.connections.push(req.user._id);
        await otherUser.save();

        await createNotification({
            recipient: userId,
            sender: req.user._id,
            type: 'connection_accepted',
            content: `${req.user.name} accepted your connection request`,
            link: `/profile/${req.user._id}`
        });

        res.json({ message: 'Connection request accepted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const rejectConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.params;

        const currentUser = await User.findById(req.user._id);
        const requestIndex = currentUser.connectionRequests.findIndex(
            req => req.from.toString() === userId
        );

        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Request not found' });
        }

        currentUser.connectionRequests.splice(requestIndex, 1);
        await currentUser.save();

        res.json({ message: 'Connection request rejected' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeConnection = async (req, res) => {
    try {
        const { userId } = req.params;

        const currentUser = await User.findById(req.user._id);
        currentUser.connections = currentUser.connections.filter(
            id => id.toString() !== userId
        );
        await currentUser.save();

        const otherUser = await User.findById(userId);
        otherUser.connections = otherUser.connections.filter(
            id => id.toString() !== req.user._id.toString()
        );
        await otherUser.save();

        res.json({ message: 'Connection removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getConnections = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId || req.user._id)
            .populate('connections', 'name profilePicture headline location');

        res.json(user.connections);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getConnectionRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('connectionRequests.from', 'name profilePicture headline');

        res.json(user.connectionRequests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
