# Full-Stack Blogging Platform (MEEN Stack)

A secure, premium, and fully functional full-stack blogging platform built using React.js, Node.js, Express, and MySQL database (via Sequelize ORM) featuring a sleek Midnight Dark Tech Theme.

## 🚀 Features
- **User Authentication**: Secure signup and login using encrypted passwords (bcryptjs) and session management via JSON Web Tokens (JWT).
- **Blog Management (CRUD)**: Logged-in users can create, read, update, and delete their own blog posts.
- **Interactive Comments Section**: Authenticated users can write comments under any blog post and delete their own comments.
- **Relational Database Design**: Implemented structured MySQL database with robust One-to-Many associations (User ➔ Posts, Post ➔ Comments).
- **Premium UI**: Designed with a responsive, high-tech Midnight Dark Theme complete with glassmorphism effects and modern neon input fields.

---

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), React Router DOM, Axios, Custom CSS3
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **Security**: JSON Web Tokens (JWT), BcryptJS, Cors

---

## 💻 Installation & Setup Instructions

### 1. MySQL Database Configuration
1. Open your MySQL client (Workbench or Command Line).
2. Execute the following command to create a clean database:
   ```sql
   CREATE DATABASE blog_platform_db;
   ```

### 2. Backend Setup
1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file inside the `backend` folder and add your credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=blog_platform_db
   JWT_SECRET=your_jwt_secret_key
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *The server will start on `http://localhost:5000` and automatically sync all database tables.*

### 3. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies and launch the Vite development server:
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser to access the application.
