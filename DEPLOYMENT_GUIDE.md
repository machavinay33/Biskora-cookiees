# Biskora Cookies Website - Deployment Guide

## Overview

The Biskora Cookies website is a full-stack web application built with React, Express, tRPC, and MySQL. This guide covers deployment to Render and other external hosting platforms.

## Technology Stack

- **Frontend:** React 19, Tailwind CSS 4, Framer Motion
- **Backend:** Express 4, tRPC 11, Node.js
- **Database:** MySQL (TiDB compatible)
- **Authentication:** Manus OAuth
- **Deployment:** Render, Railway, Vercel, or similar

## Pre-Deployment Checklist

Before deploying, ensure the following:

- [ ] All environment variables are configured
- [ ] Database schema is created and migrations applied
- [ ] Frontend builds successfully: `pnpm build`
- [ ] Backend compiles without errors: `pnpm check`
- [ ] Tests pass: `pnpm test`
- [ ] Contact form submissions are working locally

## Environment Variables

The application requires the following environment variables:

### Required for All Deployments

```
DATABASE_URL=mysql://user:password@host:port/database
NODE_ENV=production
JWT_SECRET=<random-secure-string>
VITE_APP_ID=<manus-oauth-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=<manus-oauth-portal-url>
OWNER_OPEN_ID=<owner-open-id>
OWNER_NAME=<owner-name>
BUILT_IN_FORGE_API_URL=<forge-api-url>
BUILT_IN_FORGE_API_KEY=<forge-api-key>
VITE_FRONTEND_FORGE_API_KEY=<frontend-forge-api-key>
VITE_FRONTEND_FORGE_API_URL=<forge-api-url>
VITE_ANALYTICS_ENDPOINT=<analytics-endpoint>
VITE_ANALYTICS_WEBSITE_ID=<analytics-website-id>
```

### Optional

```
VITE_APP_TITLE=Biskora Cookies
VITE_APP_LOGO=<logo-url>
```

## Deployment to Render

### Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up or log in with your GitHub account
3. Create a new project

### Step 2: Connect Your Repository

1. Click "New +" and select "Web Service"
2. Connect your GitHub repository
3. Select the branch to deploy (usually `main`)

### Step 3: Configure Build Settings

1. **Name:** biskora-cookies
2. **Environment:** Node
3. **Build Command:** `pnpm install && pnpm build`
4. **Start Command:** `pnpm start`
5. **Plan:** Standard (or higher based on traffic)

### Step 4: Set Environment Variables

1. In the Render dashboard, go to "Environment"
2. Add all required environment variables (see Environment Variables section)
3. Ensure `DATABASE_URL` points to your MySQL database

### Step 5: Configure Database

Option A: Use Render's PostgreSQL (requires code changes)
Option B: Use external MySQL service (TiDB, AWS RDS, etc.)

For external MySQL:
1. Create a MySQL database on your chosen provider
2. Set `DATABASE_URL` in Render environment variables
3. Run migrations before first deployment

### Step 6: Deploy

1. Click "Create Web Service"
2. Render will automatically deploy your application
3. Monitor the deployment logs for any errors

## Deployment to Railway

### Step 1: Create a Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### Step 2: Connect Repository

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Configure Services

1. **Add MySQL Database:**
   - Click "Add Service" → "Database" → "MySQL"
   - Configure database name and credentials

2. **Configure Node.js Application:**
   - Set build command: `pnpm install && pnpm build`
   - Set start command: `pnpm start`

### Step 4: Set Environment Variables

1. In the Node.js service, go to "Variables"
2. Add all required environment variables
3. Railway will automatically inject `DATABASE_URL` for the MySQL service

### Step 5: Deploy

1. Click "Deploy"
2. Railway will build and deploy your application
3. Check the deployment logs for any issues

## Deployment to Vercel (Frontend Only)

**Note:** Vercel is primarily for static sites. For a full-stack app, use Render or Railway instead.

If deploying only the frontend to Vercel:

1. Export static site: `pnpm build`
2. Deploy `dist` folder to Vercel
3. Configure backend API URL in environment variables

## Post-Deployment Steps

### 1. Verify Database Connection

```bash
# SSH into your deployment and run:
npm run db:push
```

### 2. Test Contact Form

1. Visit your deployed site
2. Navigate to `/contact`
3. Fill out and submit the form
4. Verify the entry appears in the `contact_inquiries` table

### 3. Monitor Application

- Check application logs for errors
- Monitor database connection health
- Set up error tracking (e.g., Sentry)

### 4. Set Up Custom Domain

1. In your hosting provider's dashboard
2. Go to "Custom Domains"
3. Add your domain (e.g., biskora.com)
4. Configure DNS records as instructed

## Troubleshooting

### Build Fails

**Error:** `pnpm: command not found`
- Solution: Ensure Node.js 18+ is installed; pnpm is included

**Error:** Database connection fails
- Solution: Verify `DATABASE_URL` is correct and database is accessible

### Application Crashes After Deployment

**Error:** `Cannot find module`
- Solution: Run `pnpm install` and ensure all dependencies are listed in `package.json`

**Error:** OAuth callback fails
- Solution: Verify `OAUTH_SERVER_URL` and `VITE_APP_ID` are correct

### Contact Form Not Working

**Error:** Form submission fails
- Solution: Check backend logs; verify database is accessible

**Error:** Form data not persisting
- Solution: Verify `DATABASE_URL` and run migrations: `npm run db:push`

## Performance Optimization

### Frontend

1. Enable gzip compression in your hosting provider
2. Use CDN for static assets
3. Optimize images (use WebP format)
4. Enable caching headers

### Backend

1. Use connection pooling for database
2. Implement rate limiting on API endpoints
3. Cache frequently accessed data
4. Monitor and optimize slow queries

## Security Considerations

1. **Environment Variables:** Never commit `.env` files; use platform-specific secret management
2. **Database:** Use strong passwords; restrict database access to application only
3. **HTTPS:** Ensure all traffic is encrypted; use SSL/TLS certificates
4. **CORS:** Configure CORS headers to allow only trusted origins
5. **Rate Limiting:** Implement rate limiting to prevent abuse
6. **Input Validation:** All form inputs are validated on both frontend and backend

## Monitoring and Maintenance

### Set Up Monitoring

1. Enable application monitoring in your hosting provider
2. Set up error tracking (e.g., Sentry, LogRocket)
3. Monitor database performance
4. Set up uptime monitoring (e.g., UptimeRobot)

### Regular Maintenance

1. Update dependencies monthly: `pnpm update`
2. Review and rotate secrets quarterly
3. Monitor database size and optimize queries
4. Review application logs weekly

## Scaling

As traffic grows, consider:

1. **Vertical Scaling:** Upgrade hosting plan (more CPU/RAM)
2. **Horizontal Scaling:** Use load balancing with multiple instances
3. **Database Scaling:** Upgrade database plan or use read replicas
4. **Caching:** Implement Redis for session and query caching
5. **CDN:** Use CDN for static assets and API responses

## Support and Resources

- **Render Documentation:** https://render.com/docs
- **Railway Documentation:** https://docs.railway.app
- **tRPC Documentation:** https://trpc.io/docs
- **Express Documentation:** https://expressjs.com
- **Tailwind CSS Documentation:** https://tailwindcss.com/docs

## Next Steps

1. Choose your hosting provider (Render recommended for full-stack)
2. Set up environment variables
3. Deploy the application
4. Test all features in production
5. Set up monitoring and alerts
6. Configure custom domain
7. Monitor performance and user feedback

---

**Last Updated:** July 2026
**Version:** 1.0.0
