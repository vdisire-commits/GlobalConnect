const connectedUsers = new Map();

export const setupSocketIO = (io) => {
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            connectedUsers.set(userId, socket.id);
        }

        socket.on('join-chat', (chatId) => {
            socket.join(chatId);
        });

        socket.on('send-message', (data) => {
            const { receiverId, message } = data;
            const receiverSocketId = connectedUsers.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receive-message', message);
            }
        });

        socket.on('typing', (data) => {
            const { receiverId } = data;
            const receiverSocketId = connectedUsers.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('user-typing', { userId });
            }
        });

        socket.on('stop-typing', (data) => {
            const { receiverId } = data;
            const receiverSocketId = connectedUsers.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('user-stop-typing', { userId });
            }
        });

        socket.on('disconnect', () => {
            if (userId) {
                connectedUsers.delete(userId);
            }
        });
    });
};

export const emitNotification = (io, userId, notification) => {
    const userSocketId = connectedUsers.get(userId.toString());
    if (userSocketId) {
        io.to(userSocketId).emit('new-notification', notification);
    }
};

export { connectedUsers };
