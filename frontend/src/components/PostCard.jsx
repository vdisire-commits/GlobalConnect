import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, commentOnPost } from '../features/post/postSlice';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLike = () => {
        dispatch(likePost(post._id));
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            dispatch(commentOnPost({ postId: post._id, text: commentText }));
            setCommentText('');
        }
    };

    const isLiked = post.likes?.includes(user?.id);

    return (
        <div className="card">
            <div className="flex items-start gap-3 mb-4">
                <img
                    src={post.author.profilePicture || 'https://via.placeholder.com/40'}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full border border-border"
                />
                <div>
                    <p className="font-semibold text-text-primary">{post.author.name}</p>
                    <p className="text-sm text-text-secondary">{post.author.headline}</p>
                    <p className="text-xs text-text-secondary opacity-70">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <p className="text-text-primary mb-4 leading-relaxed">{post.content}</p>

            {post.media && (
                <img
                    src={post.media}
                    alt="Post media"
                    className="w-full rounded-lg mb-4 border border-border shadow-lg"
                />
            )}

            <div className="flex items-center gap-6 py-3 border-t border-border">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-all duration-200 group ${isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'}`}
                >
                    <span className={`transform group-hover:scale-125 transition-transform ${isLiked ? 'scale-110' : ''}`}>
                        {isLiked ? '❤️' : '🤍'}
                    </span>
                    <span className="font-medium text-sm">{post.likes?.length || 0}</span>
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-text-secondary hover:text-accent transition-all duration-200 group"
                >
                    <span className="transform group-hover:scale-125 transition-transform text-lg">💬</span>
                    <span className="font-medium text-sm">{post.comments?.length || 0}</span>
                </button>
            </div>

            {showComments && (
                <div className="mt-4 pt-4 border-t border-border">
                    <form onSubmit={handleComment} className="mb-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="input-field flex-1"
                            />
                            <button type="submit" className="btn-primary">
                                Post
                            </button>
                        </div>
                    </form>

                    <div className="space-y-4">
                        {post.comments?.map((comment) => (
                            <div key={comment._id} className="flex gap-3">
                                <img
                                    src={comment.user.profilePicture || 'https://via.placeholder.com/32'}
                                    alt={comment.user.name}
                                    className="w-8 h-8 rounded-full border border-border"
                                />
                                <div className="flex-1 bg-secondary rounded-xl p-3 border border-border/50">
                                    <p className="font-semibold text-sm text-text-primary">{comment.user.name}</p>
                                    <p className="text-text-secondary text-sm mt-1">{comment.text}</p>
                                    <p className="text-[10px] text-text-secondary opacity-60 mt-2">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
