# RONAK - Setup Documentation

## Introduction

RONAK is a social event and meetup platform designed specifically for users in Pakistan. This documentation provides a comprehensive guide to setting up the RONAK project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- PostgreSQL (for the database)
- A code editor (e.g., Visual Studio Code)

## Getting Started

Follow these steps to set up the RONAK project:

### 1. Clone the Repository

Clone the RONAK repository to your local machine using the following command:

```bash
git clone <repository-url>
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies for both the frontend and backend:

#### For the Frontend

```bash
cd ronak/apps/web
npm install
```

#### For the Backend

```bash
cd ../api
npm install
```

### 3. Set Up Environment Variables

Copy the example environment variable file and update it with your configuration:

```bash
cp .env.example .env
```

Edit the `.env` file to include your database connection details and any other necessary configurations.

### 4. Set Up the Database

1. Create a new PostgreSQL database for the RONAK project.
2. Run the Prisma migrations to set up the database schema:

```bash
cd ../api/prisma
npx prisma migrate dev --name init
```

### 5. Seed the Database (Optional)

If you want to populate the database with initial data, run the seed script:

```bash
npx prisma db seed
```

### 6. Start the Development Servers

#### For the Frontend

Navigate back to the frontend directory and start the development server:

```bash
cd ../web
npm run dev
```

#### For the Backend

In a new terminal, navigate to the backend directory and start the server:

```bash
cd ../api
npm run start:dev
```

### 7. Access the Application

Once both servers are running, you can access the RONAK application in your web browser at:

```
http://localhost:3000
```

## Conclusion

You have successfully set up the RONAK project on your local machine. You can now explore the features of the platform and contribute to its development. For further assistance, refer to the API documentation or deployment guide in the `docs` directory.