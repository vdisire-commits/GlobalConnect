import { getUserNotifications, markAsRead, markAllAsRead } from '../services/notification.service.js';

export const getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const result = await getUserNotifications(req.user._id, parseInt(page), parseInt(limit));
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await markAsRead(notificationId, req.user._id);
        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const markAllNotificationsAsRead = async (req, res) => {
    try {
        const result = await markAllAsRead(req.user._id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
