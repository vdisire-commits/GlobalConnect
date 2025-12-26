# GlobalConnect - Professional Networking Platform

A full-stack professional networking platform built with the MERN stack, enabling users to connect, share updates, chat in real-time, and discover job opportunities.

## Tech Stack

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS v3.4** for styling
- **Socket.io Client** for real-time features
- **Axios** for API requests
- **React Router** for navigation

### Backend
- **Node.js 20.x LTS** with Express.js
- **MongoDB 7.0** with Mongoose
- **JWT** authentication + **Google OAuth**
- **Socket.io** for real-time chat and notifications
- **Cloudinary** for media storage
- **Brevo** for transactional emails
- **Bcrypt** for password hashing

### DevOps
- **Docker** & Docker Compose
- **GitHub Actions** for CI/CD
- **Vercel** (Frontend deployment)
- **Render/DigitalOcean** (Backend deployment)

## Features

### Core Functionality
- User authentication (Email/Password + Google OAuth)
- User profiles with experience, education, and skills
- Connection system (send, accept, reject requests)
- Post creation with media upload
- Like and comment on posts
- Real-time chat messaging
- Real-time notifications
- Job board with search and filters
- AI-ready job recommendations
- Admin panel for content moderation

### Real-time Features
- Live chat with typing indicators
- Instant notifications
- Unread message counters

## Installation

### Prerequisites
- Node.js 20.x or higher
- MongoDB 7.0 or MongoDB Atlas account
- Cloudinary account
- Brevo account (for emails)
- Google OAuth credentials (optional)

### Local Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd GlobalConnect
```

2. **Install dependencies**
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

3. **Start MongoDB**
```bash
mongod
```

4. **Seed Database (Optional)**
```bash
cd backend
npm run seed
```

5. **Run Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

## Docker Deployment

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 5173

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/google` - Google OAuth login

### User Endpoints
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/profile-picture` - Upload profile picture
- `POST /api/users/banner-image` - Upload banner image
- `GET /api/users/search` - Search users

### Connection Endpoints
- `POST /api/connections/request/:userId` - Send connection request
- `POST /api/connections/accept/:userId` - Accept request
- `POST /api/connections/reject/:userId` - Reject request
- `DELETE /api/connections/:userId` - Remove connection
- `GET /api/connections/requests` - Get connection requests
- `GET /api/connections/:userId?` - Get connections

### Post Endpoints
- `POST /api/posts` - Create post
- `GET /api/posts/feed` - Get feed
- `GET /api/posts/user/:userId` - Get user posts
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comment` - Comment on post
- `POST /api/posts/:postId/report` - Report post
- `DELETE /api/posts/:postId` - Delete post

### Message Endpoints
- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/:userId` - Get conversation with user
- `PUT /api/messages/:userId/read` - Mark messages as read

### Job Endpoints
- `POST /api/jobs` - Create job posting
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/saved` - Get saved jobs
- `GET /api/jobs/recommended` - Get recommended jobs
- `GET /api/jobs/:jobId` - Get job details
- `POST /api/jobs/:jobId/apply` - Apply to job
- `POST /api/jobs/:jobId/save` - Save/unsave job

### Notification Endpoints
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:notificationId/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Admin Endpoints (Admin only)
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:userId/toggle-status` - Enable/disable user
- `GET /api/admin/posts/reported` - Get reported posts
- `DELETE /api/admin/posts/:postId` - Delete post
- `PUT /api/admin/posts/:postId/dismiss` - Dismiss report
- `PUT /api/admin/jobs/:jobId/moderate` - Moderate job

## Project Structure

```
GlobalConnect/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Socket.io, Cloudinary config
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Auth, validation, upload, error handling
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (auth, email, storage, notifications)
│   │   ├── utils/           # Seed scripts
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── features/        # Redux slices
│   │   ├── pages/           # Page components
│   │   ├── services/        # API and Socket.io services
│   │   ├── store/           # Redux store
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions pipeline
├── docker-compose.yml
├── package.json
└── README.md
```


## AI-Ready Features

The platform includes AI-ready infrastructure for future enhancements:

### Job Recommendations
- Current: Basic skill and location matching
- AI-Ready: Can be enhanced with ML models for personalized recommendations
- Service Layer: `backend/src/controllers/job.controller.js` - `getRecommendedJobs`

### Future AI Capabilities
- Content moderation using ML
- Smart connection suggestions
- Skill gap analysis
- Resume parsing and matching

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
