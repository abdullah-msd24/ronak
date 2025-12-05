# RONAK API Documentation

## Overview

RONAK is a social event and meetup platform designed for users in Pakistan. This API documentation provides an overview of the available endpoints, their functionalities, and how to interact with them.

## Base URL

The base URL for the API is:

```
http://<your-api-domain>/api
```

## Authentication

All endpoints require authentication via JWT (JSON Web Token). Users must log in to receive a token, which should be included in the `Authorization` header for subsequent requests.

### Login

- **Endpoint:** `POST /auth/login`
- **Request Body:**
  - `email`: User's email
  - `password`: User's password

### Signup

- **Endpoint:** `POST /auth/signup`
- **Request Body:**
  - `name`: User's name
  - `email`: User's email
  - `password`: User's password
  - `city`: User's city

### Forgot Password

- **Endpoint:** `POST /auth/forgot-password`
- **Request Body:**
  - `email`: User's email

## User Management

### Get User Profile

- **Endpoint:** `GET /users/:id`
- **Authorization:** Required
- **Response:** User profile data

### Update User Profile

- **Endpoint:** `PUT /users/:id`
- **Authorization:** Required
- **Request Body:**
  - `name`: Updated name
  - `bio`: Updated bio
  - `age`: Updated age
  - `city`: Updated city
  - `interests`: Updated interests

## Events Management

### Create Event

- **Endpoint:** `POST /events`
- **Authorization:** Required
- **Request Body:**
  - `title`: Event title
  - `description`: Event description
  - `tags`: Event tags
  - `maxParticipants`: Maximum number of participants
  - `city`: Event city

### Get Events

- **Endpoint:** `GET /events`
- **Response:** List of events

### Join Event

- **Endpoint:** `POST /events/:id/join`
- **Authorization:** Required

### Share Experience

- **Endpoint:** `POST /events/:id/experience`
- **Authorization:** Required
- **Request Body:**
  - `title`: Experience title
  - `details`: Experience details
  - `rating`: Optional rating (1-5)

## Community Management

### Create Community

- **Endpoint:** `POST /communities`
- **Authorization:** Required
- **Request Body:**
  - `name`: Community name
  - `description`: Community description

### Get Communities

- **Endpoint:** `GET /communities`
- **Response:** List of communities

## Messaging

### Send Message

- **Endpoint:** `POST /chat/:roomId/message`
- **Authorization:** Required
- **Request Body:**
  - `content`: Message content

### Get Messages

- **Endpoint:** `GET /chat/:roomId/messages`
- **Authorization:** Required
- **Response:** List of messages in the chat room

## Reviews

### Create Review

- **Endpoint:** `POST /reviews`
- **Authorization:** Required
- **Request Body:**
  - `hostId`: ID of the host being reviewed
  - `rating`: Rating (1-5)
  - `comment`: Review comment

## Notifications

### Get Notifications

- **Endpoint:** `GET /notifications`
- **Authorization:** Required
- **Response:** List of notifications

## Admin Endpoints

### Manage Users

- **Endpoint:** `GET /admin/users`
- **Authorization:** Required (Admin only)

### Manage Events

- **Endpoint:** `GET /admin/events`
- **Authorization:** Required (Admin only)

## Conclusion

This API documentation provides a comprehensive overview of the endpoints available in the RONAK platform. For further details on each endpoint, please refer to the specific module documentation.