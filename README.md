# 📘 Evangadi Forum

A full-stack Q&A platform where users can ask questions, post answers, and engage in community discussions. Built with React, Node.js, Express, MySQL, and JWT authentication, with complete API documentation via Swagger.

## 📝 Overview

Evangadi Forum allows users to:

- Register and authenticate securely
- Post questions and browse all community questions
- View detailed question pages with answers
- Submit answers to any question

The system uses a modular architecture: React frontend, Express backend, and MySQL database managed with Prisma ORM.

## ✨ Core Features

### 🔐 Authentication

- User registration & login
- Secure password hashing (bcrypt)
- JWT-based session handling
- Protected routes & API endpoints

### ❓ Question Management

- Create new questions
- Fetch all questions (sorted by newest)
- View detailed single-question page

### 💬 Answer System

- Submit answers
- View all answers for each question
- Author information included

### 📘 API Documentation

- Fully interactive Swagger UI
- Available at: `/api-docs`

### 🎨 Modern UI

- Fully responsive UI
- Tailwind CSS
- Smooth animations & mobile-friendly design

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MySQL
- Prisma ORM
- JWT (jsonwebtoken)
- bcrypt
- Swagger (swagger-jsdoc, swagger-ui-express)
- CORS
- dotenv

### Frontend

- React 19
- React Router DOM
- Axios
- Tailwind CSS
- PostCSS & Autoprefixer

## 🚀 Installation & Setup

### Prerequisites

- Node.js v14+
- MySQL v8+
- npm or yarn

### 1. Clone Repository

```bash
git clone <repo-url>
cd Evangadi-Forum
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env`:

```env
PORT=5000
USER=your_mysql_username
PASSWORD=your_mysql_password
DATABASE=evangadi_forum
DATABASE_URL=mysql://your_mysql_username:your_mysql_password@localhost:3306/evangadi_forum
JWT_SECRET=your_jwt_secret_key_here
```

Create database:

```sql
CREATE DATABASE evangadi_forum;
```

Run migrations:

```bash
npx prisma migrate deploy
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend

```bash
cd Backend
node app.js
```

Backend runs on: `http://localhost:5000`

### Start Frontend

```bash
cd frontend
npm start
```

Frontend runs on: `http://localhost:3000`

### Access

- **Frontend App**: http://localhost:3000
- **Swagger Docs**: http://localhost:5000/api-docs

## 📄 License

This project is licensed under the ISC License.
