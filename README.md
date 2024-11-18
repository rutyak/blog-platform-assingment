MERN Stack Blog Platform:

A simple blog platform built with the MERN stack (MongoDB, Express, React, Node.js) where users can register, log in, and manage their blog posts.

# Features:

User registration and login with JWT authentication
CRUD operations for blog posts (create, read, update, delete)
Post tags and search functionality
Protected routes for creating/editing/deleting posts
Tech Stack
Frontend: React
Backend: Node.js with Express
Database: MongoDB
Authentication: JSON Web Tokens (JWT)

# Backend setup:

Clone the repository:

git clone https://github.com/rutyak/blog-platform.git

Install the required dependencies:

1. npm install
2. Create a .env file in the root directory and set the following environment variables:
MongoDB_URL=mongodb+srv://rutikkhandekar123:rutik123@cluster0.ls3e0.mongodb.net/
PORT=8000
JWT_SECRET=74481614_blog_platform
3. Start the backend server:
npm start

# API Endpoints:

1. User Authentication :
POST /register: Register a new user.
Request Body: { username, email, password }

POST /login: Log in an existing user.
Request Body: { email, password }
Response: { token }

2. Blog Posts :
GET /fetch/posts: Get all blog posts.

GET /fetch/posts/:id: Get a specific post by ID.

POST /create/posts: Create a new post (requires JWT token).

PUT /update/posts/:id: Update a post (only for the owner of the post, requires JWT token).

DELETE /delete/posts/:id: Delete a post (only for the owner of the post, requires JWT token).

# Frontend Setup
Navigate to the frontend directory:

1. cd Frontend
2. Install the required dependencies: npm install
3. Start the frontend application: npm start
4. Create a .env file in the root directory and set the following environment variables: 
  
  REACT_APP_BACKEND_URL=https://blog-platform-1-pd0w.onrender.com

# Important links: 
  
   Github Link : https://github.com/rutyak/blog-platform.git
   Deployed Frontend Link : https://new-blog-site.netlify.app/
   Deployed Backend Link : https://blog-platform-1-pd0w.onrender.com