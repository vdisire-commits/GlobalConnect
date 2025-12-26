import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getJobs = createAsyncThunk(
    'job/getJobs',
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/jobs', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
        }
    }
);

export const createJob = createAsyncThunk(
    'job/create',
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/jobs', jobData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create job');
        }
    }
);

export const applyToJob = createAsyncThunk(
    'job/apply',
    async ({ jobId, coverLetter }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/jobs/${jobId}/apply`, { coverLetter });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to apply');
        }
    }
);

export const getSavedJobs = createAsyncThunk(
    'job/getSaved',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/jobs/saved');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch saved jobs');
        }
    }
);

export const getRecommendedJobs = createAsyncThunk(
    'job/getRecommended',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/jobs/recommended');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch recommendations');
        }
    }
);

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobs: [],
        savedJobs: [],
        recommendedJobs: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload.jobs;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getSavedJobs.fulfilled, (state, action) => {
                state.savedJobs = action.payload;
            })
            .addCase(getRecommendedJobs.fulfilled, (state, action) => {
                state.recommendedJobs = action.payload;
            });
    },
});

export default jobSlice.reducer;
