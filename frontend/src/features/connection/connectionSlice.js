import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const sendConnectionRequest = createAsyncThunk(
    'connection/sendRequest',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/connections/request/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send request');
        }
    }
);

export const acceptRequest = createAsyncThunk(
    'connection/accept',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/connections/accept/${userId}`);
            return { userId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to accept');
        }
    }
);

export const getConnections = createAsyncThunk(
    'connection/getConnections',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/connections/${userId || ''}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch connections');
        }
    }
);

export const getConnectionRequests = createAsyncThunk(
    'connection/getRequests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/connections/requests');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch requests');
        }
    }
);

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        connections: [],
        requests: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getConnections.fulfilled, (state, action) => {
                state.connections = action.payload;
            })
            .addCase(getConnectionRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(r => r.from._id !== action.payload.userId);
            });
    },
});

export default connectionSlice.reducer;
