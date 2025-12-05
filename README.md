# RONAK - Discover People, Create Events, Make Memories

## Overview
RONAK is a social event and meetup platform designed specifically for users in Pakistan. The platform allows users to create accounts, host events, join meetups, and connect with people nearby. Users can also create communities, attend hangouts, and share their experiences after events, fostering a vibrant social environment.

## Features
- **User Authentication**: Secure signup/login, JWT authentication, email verification, and social logins (Google, Facebook).
- **User Profile**: Customizable profiles with name, bio, interests, and event history.
- **Events Module**: Create and manage events, join/leave events, and share experiences post-event.
- **Communities Module**: Create and manage communities with group chats and community events.
- **Matching & Recommendations**: Personalized event and user recommendations based on interests.
- **Messaging System**: Real-time chat functionality for personal and event-related conversations.
- **Home Feed**: A dynamic feed showcasing upcoming events, experiences, and trending communities.
- **Reviews System**: Rate and review hosts and attendees separately from experience posts.
- **Admin Dashboard**: Comprehensive tools for managing users, events, and content moderation.

## Tech Stack
- **Frontend**: Next.js 14, TailwindCSS, Shadcn UI, React Query, TypeScript
- **Backend**: Node.js (NestJS or Express), TypeScript, JWT
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Cloudinary for profile and event banners

## Getting Started
1. **Clone the repository**: 
   ```
   git clone <repository-url>
   cd ronak
   ```

2. **Install dependencies**:
   - For the frontend:
     ```
     cd apps/web
     npm install
     ```
   - For the backend:
     ```
     cd apps/api
     npm install
     ```

3. **Set up environment variables**: 
   Copy `.env.example` to `.env` and fill in the required values.

4. **Run the applications**:
   - Start the backend:
     ```
     cd apps/api
     npm run start:dev
     ```
   - Start the frontend:
     ```
     cd apps/web
     npm run dev
     ```

## Deployment
- **Frontend**: Deploy to Vercel.
- **Backend**: Deploy to Render.
- **Database**: Use Neon for PostgreSQL hosting.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
Special thanks to the contributors and the open-source community for their invaluable resources and support.