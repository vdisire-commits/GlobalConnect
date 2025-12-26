import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
import connectionReducer from '../features/connection/connectionSlice';
import messageReducer from '../features/message/messageSlice';
import jobReducer from '../features/job/jobSlice';
import notificationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        connection: connectionReducer,
        message: messageReducer,
        job: jobReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
