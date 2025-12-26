import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/post/postSlice';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim()) {
            await dispatch(createPost({ content, media }));
            setContent('');
            setMedia(null);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
                    rows="3"
                />
                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => setMedia(e.target.files[0])}
                            className="hidden"
                        />
                        <span className="text-accent text-xl bg-accent/10 p-2 rounded-full group-hover:bg-accent/20 transition-colors">📷</span>
                        <span className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                            {media ? media.name : 'Photo/Video'}
                        </span>
                    </label>
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="btn-primary"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
