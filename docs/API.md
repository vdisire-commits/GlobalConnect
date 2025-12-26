# API Documentation

## Base URL
```
Development: http://localhost:5000
Production: https://your-backend-url.com
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "message": "Error message",
  "stack": "Error stack (development only)"
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "",
    "role": "user"
  },
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google OAuth
```http
GET /api/auth/google
```

Redirects to Google OAuth consent screen.

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

### Users

#### Get User Profile
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Software Engineer",
  "headline": "Full Stack Developer",
  "location": "San Francisco, CA",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": [{
    "company": "Tech Corp",
    "role": "Senior Developer",
    "startDate": "2020-01-01",
    "current": true
  }]
}
```

#### Upload Profile Picture
```http
POST /api/users/profile-picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

image: <file>
```

#### Search Users
```http
GET /api/users/search?query=john&skills=javascript&location=san francisco
Authorization: Bearer <token>
```

### Connections

#### Send Connection Request
```http
POST /api/connections/request/:userId
Authorization: Bearer <token>
```

#### Accept Connection Request
```http
POST /api/connections/accept/:userId
Authorization: Bearer <token>
```

#### Get Connections
```http
GET /api/connections/:userId?
Authorization: Bearer <token>
```

### Posts

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

content: "This is my post"
media: <file>
visibility: "public"
```

#### Get Feed
```http
GET /api/posts/feed?page=1&limit=10
Authorization: Bearer <token>
```

#### Like Post
```http
POST /api/posts/:postId/like
Authorization: Bearer <token>
```

#### Comment on Post
```http
POST /api/posts/:postId/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Great post!"
}
```

### Messages

#### Send Message
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiverId": "user_id",
  "content": "Hello!"
}
```

#### Get Conversations
```http
GET /api/messages/conversations
Authorization: Bearer <token>
```

#### Get Conversation
```http
GET /api/messages/:userId?page=1&limit=50
Authorization: Bearer <token>
```

### Jobs

#### Create Job
```http
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior React Developer",
  "company": "Tech Corp",
  "description": "We are looking for...",
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "experienceLevel": "senior",
  "skills": ["React", "TypeScript"],
  "salary": {
    "min": 120000,
    "max": 180000,
    "currency": "USD"
  }
}
```

#### Get Jobs
```http
GET /api/jobs?query=react&location=san francisco&jobType=full-time&page=1&limit=20
Authorization: Bearer <token>
```

#### Apply to Job
```http
POST /api/jobs/:jobId/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "coverLetter": "I am interested in this position..."
}
```

#### Get Recommended Jobs
```http
GET /api/jobs/recommended
Authorization: Bearer <token>
```

### Notifications

#### Get Notifications
```http
GET /api/notifications?page=1&limit=20
Authorization: Bearer <token>
```

Response:
```json
{
  "notifications": [],
  "total": 50,
  "unreadCount": 5,
  "page": 1,
  "pages": 3
}
```

#### Mark as Read
```http
PUT /api/notifications/:notificationId/read
Authorization: Bearer <token>
```

### Admin (Admin Only)

#### Get Statistics
```http
GET /api/admin/stats
Authorization: Bearer <token>
```

Response:
```json
{
  "totalUsers": 1000,
  "activeUsers": 850,
  "totalPosts": 5000,
  "reportedPosts": 10,
  "totalJobs": 200,
  "activeJobs": 180
}
```

#### Get All Users
```http
GET /api/admin/users?page=1&limit=20&search=john
Authorization: Bearer <token>
```

#### Toggle User Status
```http
PUT /api/admin/users/:userId/toggle-status
Authorization: Bearer <token>
```

#### Get Reported Posts
```http
GET /api/admin/posts/reported?page=1&limit=20
Authorization: Bearer <token>
```

#### Delete Post
```http
DELETE /api/admin/posts/:postId
Authorization: Bearer <token>
```

## WebSocket Events

### Client to Server

#### Join Chat
```javascript
socket.emit('join-chat', chatId);
```

#### Send Message
```javascript
socket.emit('send-message', {
  receiverId: 'user_id',
  message: messageObject
});
```

#### Typing Indicator
```javascript
socket.emit('typing', { receiverId: 'user_id' });
socket.emit('stop-typing', { receiverId: 'user_id' });
```

### Server to Client

#### Receive Message
```javascript
socket.on('receive-message', (message) => {
  console.log(message);
});
```

#### New Notification
```javascript
socket.on('new-notification', (notification) => {
  console.log(notification);
});
```

#### User Typing
```javascript
socket.on('user-typing', ({ userId }) => {
  console.log(`${userId} is typing...`);
});
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per 15 minutes
- General endpoints: 100 requests per 15 minutes
- File uploads: 10 requests per hour

## Error Codes

- `400` Bad Request - Invalid input
- `401` Unauthorized - Missing or invalid token
- `403` Forbidden - Insufficient permissions
- `404` Not Found - Resource not found
- `429` Too Many Requests - Rate limit exceeded
- `500` Internal Server Error - Server error
