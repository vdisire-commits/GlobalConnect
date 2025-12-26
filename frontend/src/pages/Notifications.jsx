import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markAsRead } from '../features/notification/notificationSlice';

const Notifications = () => {
    const dispatch = useDispatch();
    const { notifications, isLoading } = useSelector((state) => state.notification);

    useEffect(() => {
        dispatch(getNotifications(1));
    }, [dispatch]);

    const handleMarkAsRead = (notificationId) => {
        dispatch(markAsRead(notificationId));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card">
                <h1 className="text-2xl font-bold text-text-primary mb-6">Notifications</h1>

                {isLoading ? (
                    <div className="text-center py-8 text-text-secondary">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                        No notifications yet
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`p-4 rounded-lg border transition-colors cursor-pointer ${notification.read
                                    ? 'bg-secondary/50 border-border'
                                    : 'bg-accent/10 border-accent/30'
                                    }`}
                                onClick={() => !notification.read && handleMarkAsRead(notification._id)}
                            >
                                <div className="flex items-start gap-3">
                                    {notification.sender && (
                                        <img
                                            src={notification.sender.profilePicture || 'https://via.placeholder.com/40'}
                                            alt={notification.sender.name}
                                            className="w-10 h-10 rounded-full border border-border"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-text-primary">{notification.content}</p>
                                        <p className="text-sm text-text-secondary mt-1">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <span className="w-2 h-2 bg-accent rounded-full mt-2 shadow-[0_0_8px_rgba(255,140,66,0.5)]"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
