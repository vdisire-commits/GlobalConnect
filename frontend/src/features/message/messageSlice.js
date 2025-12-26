import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getConversations = createAsyncThunk(
    'message/getConversations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/messages/conversations');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversations');
        }
    }
);

export const getConversation = createAsyncThunk(
    'message/getConversation',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/messages/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
        }
    }
);

export const sendMessage = createAsyncThunk(
    'message/send',
    async ({ receiverId, content }, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/messages', { receiverId, content });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send message');
        }
    }
);

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        conversations: [],
        currentConversation: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.currentConversation.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.fulfilled, (state, action) => {
                state.conversations = action.payload;
            })
            .addCase(getConversation.fulfilled, (state, action) => {
                state.currentConversation = action.payload.messages;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.currentConversation.push(action.payload);
            });
    },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
