import { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [reportedPosts, setReportedPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        fetchStats();
        fetchUsers();
        fetchReportedPosts();
    }, []);

    const fetchStats = async () => {
        const response = await api.get('/api/admin/stats');
        setStats(response.data);
    };

    const fetchUsers = async () => {
        const response = await api.get('/api/admin/users');
        setUsers(response.data.users);
    };

    const fetchReportedPosts = async () => {
        const response = await api.get('/api/admin/posts/reported');
        setReportedPosts(response.data.posts);
    };

    const toggleUserStatus = async (userId) => {
        await api.put(`/api/admin/users/${userId}/toggle-status`);
        fetchUsers();
    };

    const deletePost = async (postId) => {
        await api.delete(`/api/admin/posts/${postId}`);
        fetchReportedPosts();
    };

    return (
        <div className="bg-primary min-h-screen">
            <h1 className="text-3xl font-bold text-text-primary mb-6">Admin Dashboard</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('stats')}
                    className={activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}
                >
                    Statistics
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveTab('posts')}
                    className={activeTab === 'posts' ? 'btn-primary' : 'btn-secondary'}
                >
                    Reported Posts
                </button>
            </div>

            {activeTab === 'stats' && stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card border-l-4 border-l-accent">
                        <h3 className="text-lg font-semibold text-text-secondary mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-accent">{stats.totalUsers}</p>
                        <p className="text-sm text-text-secondary mt-1 opacity-80">{stats.activeUsers} active</p>
                    </div>
                    <div className="card border-l-4 border-l-accent">
                        <h3 className="text-lg font-semibold text-text-secondary mb-2">Total Posts</h3>
                        <p className="text-3xl font-bold text-accent">{stats.totalPosts}</p>
                        <p className="text-sm text-text-secondary mt-1 opacity-80">{stats.reportedPosts} reported</p>
                    </div>
                    <div className="card border-l-4 border-l-accent">
                        <h3 className="text-lg font-semibold text-text-secondary mb-2">Total Jobs</h3>
                        <p className="text-3xl font-bold text-accent">{stats.totalJobs}</p>
                        <p className="text-sm text-text-secondary mt-1 opacity-80">{stats.activeJobs} active</p>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="card">
                    <h2 className="text-xl font-bold text-text-primary mb-4">User Management</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-text-secondary uppercase text-xs">Name</th>
                                    <th className="text-left py-3 px-4 text-text-secondary uppercase text-xs">Email</th>
                                    <th className="text-left py-3 px-4 text-text-secondary uppercase text-xs">Status</th>
                                    <th className="text-left py-3 px-4 text-text-secondary uppercase text-xs">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                                        <td className="py-3 px-4 text-text-primary font-medium">{user.name}</td>
                                        <td className="py-3 px-4 text-text-secondary">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className={`badge ${user.isActive ? 'bg-success/10 text-success border-success/30' : 'bg-danger/10 text-danger border-danger/30'}`}>
                                                {user.isActive ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => toggleUserStatus(user._id)}
                                                className="btn-secondary text-xs px-3 py-1.5"
                                            >
                                                {user.isActive ? 'Disable' : 'Enable'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'posts' && (
                <div className="card">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Reported Posts</h2>
                    <div className="space-y-4">
                        {reportedPosts.map((post) => (
                            <div key={post._id} className="border border-border rounded-xl p-4 bg-secondary/30">
                                <p className="text-text-primary mb-2 italic">"{post.content}"</p>
                                <p className="text-sm text-text-secondary mb-3 flex items-center gap-2">
                                    <span className="text-accent">•</span> By {post.author.name} <span className="text-accent">•</span> {post.reports.length} reports
                                </p>
                                <button
                                    onClick={() => deletePost(post._id)}
                                    className="btn-secondary text-sm bg-danger/10 text-danger border-danger/30 hover:bg-danger hover:text-white transition-all"
                                >
                                    Delete Post
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
