import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Post from '../models/Post.model.js';
import Job from '../models/Job.model.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        await User.deleteMany({});
        await Post.deleteMany({});
        await Job.deleteMany({});

        console.log('Cleared existing data');

        const password = await bcrypt.hash('password123', 10);

        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password,
                headline: 'Software Engineer at Tech Corp',
                bio: 'Passionate about building scalable applications',
                location: 'San Francisco, CA',
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                experience: [{
                    company: 'Tech Corp',
                    role: 'Senior Software Engineer',
                    startDate: new Date('2020-01-01'),
                    current: true
                }],
                role: 'admin'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password,
                headline: 'Product Manager at Innovation Labs',
                bio: 'Driving product strategy and user experience',
                location: 'New York, NY',
                skills: ['Product Management', 'Agile', 'UX Design'],
                experience: [{
                    company: 'Innovation Labs',
                    role: 'Product Manager',
                    startDate: new Date('2019-06-01'),
                    current: true
                }]
            },
            {
                name: 'Mike Johnson',
                email: 'mike@example.com',
                password,
                headline: 'Full Stack Developer',
                bio: 'Building modern web applications',
                location: 'Austin, TX',
                skills: ['Python', 'Django', 'React', 'PostgreSQL']
            }
        ]);

        console.log('Created users');

        users[0].connections.push(users[1]._id);
        users[1].connections.push(users[0]._id);
        await users[0].save();
        await users[1].save();

        await Post.insertMany([
            {
                author: users[0]._id,
                content: 'Excited to announce that I just launched a new project using MERN stack! Check it out.',
                visibility: 'public'
            },
            {
                author: users[1]._id,
                content: 'Looking for talented developers to join our team. DM me if interested!',
                visibility: 'public'
            }
        ]);

        console.log('Created posts');

        await Job.insertMany([
            {
                postedBy: users[0]._id,
                title: 'Senior React Developer',
                company: 'Tech Corp',
                description: 'We are looking for an experienced React developer to join our team.',
                location: 'San Francisco, CA',
                jobType: 'full-time',
                experienceLevel: 'senior',
                skills: ['React', 'TypeScript', 'Node.js'],
                salary: { min: 120000, max: 180000, currency: 'USD' }
            },
            {
                postedBy: users[1]._id,
                title: 'Product Designer',
                company: 'Innovation Labs',
                description: 'Join our design team to create amazing user experiences.',
                location: 'New York, NY',
                jobType: 'full-time',
                experienceLevel: 'mid',
                skills: ['Figma', 'UI/UX', 'Prototyping'],
                salary: { min: 90000, max: 130000, currency: 'USD' }
            }
        ]);

        console.log('Created jobs');
        console.log('Seed data created successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
