import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../features/post/postSlice';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

const Feed = () => {
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getFeed(1));
    }, [dispatch]);

    return (
        <div className="max-w-2xl mx-auto">
            <CreatePost />

            <div className="mt-6 space-y-4">
                {isLoading ? (
                    <div className="text-center py-8 text-text-secondary">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="card text-center py-8 text-text-secondary">
                        No posts yet. Start by creating your first post!
                    </div>
                ) : (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                )}
            </div>
        </div>
    );
};

export default Feed;
