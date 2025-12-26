import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../features/auth/authSlice';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await dispatch(forgotPassword(email));
        setIsLoading(false);
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="card">
                    <h2 className="text-2xl font-bold text-text-primary mb-2">Reset Password</h2>
                    <p className="text-text-secondary mb-6">
                        Enter your email and we'll send you a reset link
                    </p>

                    {sent ? (
                        <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg mb-4">
                            Password reset link sent! Check your email.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    )}

                    <p className="mt-6 text-center text-sm text-text-secondary">
                        <Link to="/login" className="text-accent hover:text-accent-500 font-medium">
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
