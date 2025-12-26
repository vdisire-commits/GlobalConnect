import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import socketService from '../services/socket';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { unreadCount } = useSelector((state) => state.notification);

    const handleLogout = () => {
        socketService.disconnect();
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-primary shadow-sm border-b border-border sticky top-0 z-50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/feed" className="text-2xl font-bold text-accent">
                            GlobalConnect
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link to="/feed" className="nav-link">
                                Feed
                            </Link>
                            <Link to="/jobs" className="nav-link">
                                Jobs
                            </Link>
                            <Link to="/messages" className="nav-link">
                                Messages
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/notifications" className="relative nav-link">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-primary-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                        <Link to={`/profile/${user?.id}`} className="nav-link">
                            Profile
                        </Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="nav-link">
                                Admin
                            </Link>
                        )}
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
