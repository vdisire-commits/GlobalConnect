import Notification from '../models/Notification.model.js';
import { io } from '../server.js';
import { emitNotification } from '../config/socket.js';

export const createNotification = async (notificationData) => {
    const notification = await Notification.create(notificationData);
    const populatedNotification = await Notification.findById(notification._id)
        .populate('sender', 'name profilePicture');

    emitNotification(io, notificationData.recipient, populatedNotification);

    return populatedNotification;
};

export const getUserNotifications = async (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ recipient: userId })
        .populate('sender', 'name profilePicture')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Notification.countDocuments({ recipient: userId });
    const unreadCount = await Notification.countDocuments({ recipient: userId, read: false });

    return {
        notifications,
        total,
        unreadCount,
        page,
        pages: Math.ceil(total / limit)
    };
};

export const markAsRead = async (notificationId, userId) => {
    const notification = await Notification.findOne({ _id: notificationId, recipient: userId });

    if (!notification) {
        throw new Error('Notification not found');
    }

    notification.read = true;
    notification.readAt = new Date();
    await notification.save();

    return notification;
};

export const markAllAsRead = async (userId) => {
    await Notification.updateMany(
        { recipient: userId, read: false },
        { read: true, readAt: new Date() }
    );

    return { message: 'All notifications marked as read' };
};
