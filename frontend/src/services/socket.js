import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(userId) {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                query: { userId },
                transports: ['websocket'],
            });

            this.socket.on('connect', () => {
                console.log('Socket connected');
            });

            this.socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });
        }
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    joinChat(chatId) {
        this.emit('join-chat', chatId);
    }

    sendMessage(receiverId, message) {
        this.emit('send-message', { receiverId, message });
    }

    typing(receiverId) {
        this.emit('typing', { receiverId });
    }

    stopTyping(receiverId) {
        this.emit('stop-typing', { receiverId });
    }
}

export default new SocketService();
