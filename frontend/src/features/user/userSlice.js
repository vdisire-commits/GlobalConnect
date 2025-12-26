import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getUserProfile = createAsyncThunk(
    'user/getProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/users/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.put('/api/users/profile', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Update failed');
        }
    }
);

export const uploadProfilePicture = createAsyncThunk(
    'user/uploadProfilePicture',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await api.post('/api/users/profile-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Upload failed');
        }
    }
);

export const searchUsers = createAsyncThunk(
    'user/search',
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/users/search', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Search failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        searchResults: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.searchResults = action.payload.users;
            });
    },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
