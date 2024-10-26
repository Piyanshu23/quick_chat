# Chat App

A real-time chat application built with **Express.js** on the backend and **Next.js** on the frontend, utilizing **Socket.io** for real-time communication. This project also incorporates **Redis** stream adapters to connect with multiple servers while scaling.

## Features

- Real-time messaging between users.
- User authentication.
- Responsive design for mobile and desktop views.
- Supports multiple chat rooms.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** Next.js
- **Real-time Communication:** Socket.io
- **Database:** Redis with Redis Stack
- **Containerization:** Docker

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd chat_app
2. **Set up the Redis container**
   ```bash
   docker pull redis/redis-stack
   docker run -d -p 6379:6379 -p 8001:8001 redis/redis-stack
3. **Install dependencies:**
 For the backend, navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install

For the frontend, navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm instal
5. 
