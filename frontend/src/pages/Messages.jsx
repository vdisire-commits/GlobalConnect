import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations, getConversation, sendMessage } from '../features/message/messageSlice';
import socketService from '../services/socket';

const Messages = () => {
    const dispatch = useDispatch();
    const { conversations, currentConversation } = useSelector((state) => state.message);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        dispatch(getConversations());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUser) {
            dispatch(getConversation(selectedUser._id));
            socketService.joinChat(selectedUser._id);
        }
    }, [selectedUser, dispatch]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageText.trim() && selectedUser) {
            dispatch(sendMessage({ receiverId: selectedUser._id, content: messageText }));
            socketService.sendMessage(selectedUser._id, { content: messageText });
            setMessageText('');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="card overflow-y-auto">
                <h2 className="text-xl font-bold text-text-primary mb-4">Conversations</h2>
                <div className="space-y-2">
                    {conversations.map((conv) => (
                        <button
                            key={conv._id._id}
                            onClick={() => setSelectedUser(conv._id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${selectedUser?._id === conv._id._id ? 'bg-accent/10 border border-accent/20' : 'hover:bg-secondary'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={conv._id.profilePicture || 'https://via.placeholder.com/40'}
                                    alt={conv._id.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-text-primary truncate">{conv._id.name}</p>
                                    <p className="text-sm text-text-secondary truncate">
                                        {conv.lastMessage.content}
                                    </p>
                                </div>
                                {conv.unreadCount > 0 && (
                                    <span className="badge bg-accent text-primary-900 font-bold">
                                        {conv.unreadCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="md:col-span-2 card flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="border-b border-border pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={selectedUser.profilePicture || 'https://via.placeholder.com/40'}
                                    alt={selectedUser.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium text-text-primary">{selectedUser.name}</p>
                                    <p className="text-sm text-text-secondary">{selectedUser.headline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-2">
                            {currentConversation.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`flex ${msg.sender._id === selectedUser._id ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender._id === selectedUser._id
                                            ? 'bg-secondary text-text-primary border border-border'
                                            : 'bg-accent text-primary-900 font-medium'
                                            }`}
                                    >
                                        <p>{msg.content}</p>
                                        <p className="text-[10px] mt-1 opacity-70">
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Type a message..."
                                className="input-field flex-1"
                            />
                            <button type="submit" className="btn-primary">
                                Send
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-text-secondary">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
