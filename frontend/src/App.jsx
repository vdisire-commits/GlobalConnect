import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import socketService from './services/socket';
import { addNotification } from './features/notification/notificationSlice';
import { addMessage } from './features/message/messageSlice';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Jobs from './pages/Jobs';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/admin/Dashboard';
import Landing from './pages/Landing';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            const socket = socketService.connect(user.id);

            socket.on('new-notification', (notification) => {
                dispatch(addNotification(notification));
            });

            socket.on('receive-message', (message) => {
                dispatch(addMessage(message));
            });

            return () => {
                socketService.disconnect();
            };
        }
    }, [user, dispatch]);

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/feed" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/feed" /> : <Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/" element={user ? <Navigate to="/feed" /> : <Landing />} />

            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="/home" element={<Home />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
            </Route>

            <Route path="/admin" element={<AdminRoute><Layout /></AdminRoute>}>
                <Route index element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
