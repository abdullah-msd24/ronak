# RONAK Deployment Guide

## Overview

This document provides a comprehensive guide for deploying the RONAK application, a social event and meetup platform for Pakistan. The application consists of a frontend built with Next.js and a backend built with NestJS. 

## Prerequisites

Before deploying, ensure you have the following:

- Node.js (version 14 or higher)
- PostgreSQL database
- Cloudinary account for image storage
- Vercel account for frontend deployment
- Render account for backend deployment

## Deployment Steps

### 1. Backend Deployment

#### a. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd ronak/apps/api
```

#### b. Install Dependencies

Install the required dependencies:

```bash
npm install
```

#### c. Configure Environment Variables

Create a `.env` file based on the `.env.example` file and fill in the required values:

```bash
cp .env.example .env
```

#### d. Database Setup

1. Create a PostgreSQL database.
2. Update the database connection details in the `.env` file.
3. Run the Prisma migrations to set up the database schema:

```bash
npx prisma migrate deploy
```

4. (Optional) Seed the database with initial data:

```bash
npx prisma db seed
```

#### e. Start the Backend Server

Run the backend server locally to test:

```bash
npm run start:dev
```

#### f. Deploy to Render

1. Create a new web service on Render.
2. Connect your GitHub repository.
3. Set the build command to `npm install` and the start command to `npm run start:prod`.
4. Add environment variables in the Render dashboard as per your `.env` file.

### 2. Frontend Deployment

#### a. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd ronak/apps/web
```

#### b. Install Dependencies

Install the required dependencies:

```bash
npm install
```

#### c. Configure Environment Variables

Create a `.env` file based on the `.env.example` file and fill in the required values:

```bash
cp .env.example .env
```

#### d. Build the Frontend

Build the Next.js application:

```bash
npm run build
```

#### e. Deploy to Vercel

1. Go to the Vercel dashboard and create a new project.
2. Import your GitHub repository.
3. Set the environment variables in the Vercel dashboard as per your `.env` file.
4. Vercel will automatically build and deploy your application.

### 3. Post-Deployment

After deployment, ensure that:

- The frontend is correctly pointing to the backend API.
- All environment variables are set correctly in both Vercel and Render.
- Test the application thoroughly to ensure all features are working as expected.

## Conclusion

You have successfully deployed the RONAK application. For any issues or further assistance, please refer to the documentation or contact support.