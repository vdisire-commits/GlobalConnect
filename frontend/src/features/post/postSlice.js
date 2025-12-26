import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getFeed = createAsyncThunk(
    'post/getFeed',
    async (page = 1, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/posts/feed?page=${page}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch feed');
        }
    }
);

export const createPost = createAsyncThunk(
    'post/create',
    async (postData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('content', postData.content);
            if (postData.media) {
                formData.append('media', postData.media);
            }
            if (postData.visibility) {
                formData.append('visibility', postData.visibility);
            }
            const response = await api.post('/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create post');
        }
    }
);

export const likePost = createAsyncThunk(
    'post/like',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/posts/${postId}/like`);
            return { postId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to like post');
        }
    }
);

export const commentOnPost = createAsyncThunk(
    'post/comment',
    async ({ postId, text }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/posts/${postId}/comment`, { text });
            return { postId, comments: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to comment');
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        isLoading: false,
        error: null,
        page: 1,
        hasMore: true,
    },
    reducers: {
        clearPosts: (state) => {
            state.posts = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeed.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.page === 1
                    ? action.payload.posts
                    : [...state.posts, ...action.payload.posts];
                state.page = action.payload.page;
                state.hasMore = action.payload.page < action.payload.pages;
            })
            .addCase(getFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const post = state.posts.find(p => p._id === action.payload.postId);
                if (post) {
                    post.likes = action.payload.likes;
                }
            })
            .addCase(commentOnPost.fulfilled, (state, action) => {
                const post = state.posts.find(p => p._id === action.payload.postId);
                if (post) {
                    post.comments = action.payload.comments;
                }
            });
    },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
