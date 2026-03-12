# Database and Environment Setup Guide

To get Brainwave running with a database, follow these steps:

## 1. Set up MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Project and a new Cluster (the free shared tier is sufficient).
3. In "Database Access", create a new database user with a password.
4. In "Network Access", add `0.0.0.0/0` to allow access from anywhere (or specific IPs if you prefer).
5. Go to "Clusters" -> "Connect" -> "Connect your application".
6. Copy the connection string. It should look like: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`.

## 2. Configure Environment Variables
You need to set the following environment variables. You can find a template in `.env.example`.

### Local Development
Create a `.env` file in the root directory and add your variables there.

### Vercel Deployment
1. Go to your project dashboard on Vercel.
2. Navigate to "Settings" -> "Environment Variables".
3. Add the following keys and their values:
   - `DATABASE_URL`: Your MongoDB connection string.
   - `NEXTAUTH_SECRET`: A long random string (you can generate one with `openssl rand -base64 32`).
   - `NEXTAUTH_URL`: Your deployment URL (e.g., `https://your-project.vercel.app`).
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: (Optional) From Google Cloud Console if using Google login.
   - `EMAIL_SERVER_*` and `EMAIL_FROM`: (Optional) For magic link authentication.

## 3. Deploy
Once environment variables are set, trigger a new deployment on Vercel. The build process will automatically run `prisma generate` and `next build`.
