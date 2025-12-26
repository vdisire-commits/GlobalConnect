import { registerUser, loginUser } from '../services/auth.service.js';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

jest.mock('../models/User.model.js');
jest.mock('bcryptjs');

describe('Auth Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.create.mockResolvedValue({
                _id: '123',
                name: userData.name,
                email: userData.email,
                profilePicture: '',
                role: 'user'
            });

            const result = await registerUser(userData);

            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('token');
            expect(result.user.email).toBe(userData.email);
        });

        it('should throw error if user already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'test@example.com' });

            await expect(registerUser({ email: 'test@example.com' }))
                .rejects.toThrow('User already exists');
        });
    });
});
