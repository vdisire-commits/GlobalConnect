# Deployment Guide

## Prerequisites

Before deploying GlobalConnect, ensure you have:
- MongoDB Atlas account
- Cloudinary account
- Brevo account
- Google OAuth credentials (optional)
- Vercel account (for frontend)
- Render or DigitalOcean account (for backend)

## Step 1: Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist IP addresses (0.0.0.0/0 for all IPs or specific IPs)
5. Get connection string from "Connect" button
6. Replace `<password>` in connection string with your database password

Example connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/globalconnect?retryWrites=true&w=majority
```

## Step 2: Third-Party Services Setup

### Cloudinary (Media Storage)
1. Sign up at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from dashboard
3. Save these credentials for environment variables

### Brevo (Email Service)
1. Sign up at https://www.brevo.com
2. Create an API key from Settings > API Keys
3. Verify your sender email address
4. Save API key for environment variables

### Google OAuth (Optional)
1. Go to Google Cloud Console
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Save Client ID and Client Secret

## Step 3: Backend Deployment (Render)

1. **Create New Web Service**
   - Go to https://render.com
   - Click "New" > "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Name: globalconnect-backend
   - Environment: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Branch: main

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   DB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRE=7d
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GOOGLE_CALLBACK_URL=<your-backend-url>/api/auth/google/callback
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   BREVO_API_KEY=<your-brevo-api-key>
   BREVO_SENDER_EMAIL=noreply@globalconnect.com
   BREVO_SENDER_NAME=GlobalConnect
   FRONTEND_URL=<your-frontend-url>
   PORT=5000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL

## Step 4: Frontend Deployment (Vercel)

1. **Import Project**
   - Go to https://vercel.com
   - Click "Add New" > "Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist

3. **Set Environment Variables**
   ```
   VITE_API_URL=<your-backend-url>
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL

5. **Update Backend Environment**
   - Go back to Render
   - Update `FRONTEND_URL` with your Vercel URL
   - Update `GOOGLE_CALLBACK_URL` if using Google OAuth
   - Redeploy backend

## Step 5: Post-Deployment Configuration

1. **Update Google OAuth Redirect URIs**
   - Add production callback URL to Google Cloud Console
   - Format: `<backend-url>/api/auth/google/callback`

2. **Test the Application**
   - Visit your frontend URL
   - Create a test account
   - Test all major features

3. **Seed Production Data (Optional)**
   - Connect to your production backend
   - Run seed script if needed

## Alternative: Docker Deployment

### Using Docker Compose

1. **Update docker-compose.yml**
   - Set production environment variables
   - Configure MongoDB Atlas connection

2. **Deploy to VPS**
   ```bash
   docker-compose up -d --build
   ```

3. **Setup Nginx Reverse Proxy**
   - Configure SSL certificates
   - Proxy requests to containers

## Monitoring and Maintenance

### Health Checks
- Backend health endpoint: `<backend-url>/health`
- Monitor response times and uptime

### Logs
- Render: View logs in dashboard
- Vercel: View deployment and function logs

### Database Backups
- MongoDB Atlas provides automatic backups
- Configure backup schedule in Atlas dashboard

### Scaling
- Render: Upgrade to paid plan for auto-scaling
- Vercel: Automatically scales with traffic

## Troubleshooting

### Common Issues

**CORS Errors**
- Verify `FRONTEND_URL` is set correctly in backend
- Check CORS configuration in backend

**Database Connection Failed**
- Verify MongoDB Atlas connection string
- Check IP whitelist settings
- Ensure database user has correct permissions

**OAuth Not Working**
- Verify redirect URIs in Google Console
- Check OAuth credentials in environment variables
- Ensure callback URL matches exactly

**File Upload Errors**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper MIME types

## Security Checklist

- [ ] Use strong JWT secret (min 32 characters)
- [ ] Enable HTTPS on all endpoints
- [ ] Set secure environment variables
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Regular security updates
- [ ] Monitor for suspicious activity
- [ ] Backup database regularly

## Performance Optimization

- Enable MongoDB indexes
- Implement Redis caching (optional)
- Optimize image sizes with Cloudinary
- Enable CDN for static assets
- Monitor API response times
- Implement pagination for large datasets

## Support

For deployment issues, check:
- Render documentation: https://render.com/docs
- Vercel documentation: https://vercel.com/docs
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com
