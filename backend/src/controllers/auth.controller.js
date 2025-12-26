import { registerUser, loginUser, forgotPassword, resetPassword } from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                profilePicture: req.user.profilePicture,
                role: req.user.role
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await forgotPassword(email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const resetPasswordHandler = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const result = await resetPassword(token, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
