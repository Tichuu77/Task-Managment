
📝 Task Management API
A simple, secure, and scalable Task Management REST API built using Node.js, Express, and MongoDB. This backend allows user registration, login, and full CRUD operations on tasks, all protected via JWT-based authentication.

🚀 Project Overview
This project is a RESTful API that enables:

User registration and login with hashed passwords and token-based authentication.

Creation, retrieval, updating, and deletion of tasks.

Protected routes for task operations using JWT.

A clean architecture using controllers, routes, middleware, and proper error handling.

⚙️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT

Hosting: Render

Documentation: Postman

🛠️ Local Setup
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/Tichuu77/Task-Managment.git
cd Task-Managment
2. Install dependencies
bash
Copy
Edit
npm install
3. Create a .env file
env
Copy
Edit
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
PORT=8000
CLIENT_URL=*
Use the values:

ini
Copy
Edit
MONGODB_URI=mongodb+srv://akashtikhat50:6TlFEDIfIDjI3Ln0@taskmanagment.ozqkrub.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagment
JWT_SECRET=TaskManagment@987
JWT_EXPIRES_IN=1d
PORT=8000
CLIENT_URL=*
4. Start the server
bash
Copy
Edit
npm start
API will be running on http://localhost:8000

🌐 Deployed API
Live URL: https://task-managment-nk71.onrender.com

📬 Postman Collection
View and test the APIs using this collection:
🔗 Postman Collection Link

📑 API Overview - Task Management Documentation
🔐 Authorization
All protected routes require a Bearer Token in headers.

makefile
Copy
Edit
Authorization: Bearer <token>
🧑 User Auth
POST /user/auth/register
Register a new user
Body (x-www-form-urlencoded):

makefile
Copy
Edit
name: karthik  
email: karthik588@gmail.com  
password: password  
POST /user/auth/login
Login user and receive token
Body (x-www-form-urlencoded):

makefile
Copy
Edit
email: karthik588@gmail.com  
password: password  
GET /user/
Get user profile (requires Bearer token)

✅ Task Routes
GET /tasks/
Fetch all tasks for a user

GET /tasks/:id
Get task by ID

POST /tasks/
Create a task
Body (x-www-form-urlencoded):

arduino
Copy
Edit
title: Task title  
description: Task description  
PUT /tasks/:id
Update a task
Body (x-www-form-urlencoded):

makefile
Copy
Edit
title: Updated title  
description: Updated description  
DELETE /tasks/:id
Delete a task

🖥️ Example Authorization Header
http
Copy
Edit
Authorization: Bearer eyJhbGciOi...your_token_here
📤 Deployment Details
Platform: Render

Free Plan

MongoDB hosted on MongoDB Atlas

Environment variables secured via .env
