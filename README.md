# TODO App (MERN Stack)

## 📌 Project Overview
This is a **Full-Stack TODO Application** built using the **MERN (MongoDB, Express.js, React, Node.js) stack**. The application allows users to register, log in, and manage their tasks efficiently. It supports **CRUD operations** on TODOs, authentication with **JWT tokens**, and features such as filtering, searching, and sorting of tasks.

---

## 🏗️ Tech Stack
- **Frontend**: React, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Database**: MongoDB (Mongoose for ODM)
- **State Management**: Redux Toolkit
- **Authentication**: JSON Web Tokens (JWT)

---

## ⚡ Features
### ✅ Authentication
- User **registration**, **login**, and **logout**.
- Secure authentication using **JWT tokens**.
- Password reset via **forgot/reset password endpoints**.

### 📋 Todo Management
- Users can **Create, Read, Update, and Delete (CRUD)** their tasks.
- Each task has a **title, description, deadline, and status**.
- Tasks are **private to each user**.

### 🔍 Searching, Filtering & Sorting
- **Filter** tasks by status (e.g., `ACTIVE`, `IN_PROGRESS`, `COMPLETED`).
- **Search** tasks by title or description.
- **Sort** tasks by **deadline** or **status**.
- Supports **combined filtering, searching, and sorting** in API queries.

---

## 🔗 API Endpoints
### **Authentication Routes**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in user and receive JWT token |
| GET | `/api/auth/me` | Get the current authenticated user's details |
| GET | `/api/auth/logout` | Logout user |
| POST | `/api/auth/forgotpassword` | Request password reset token |
| PUT | `/api/auth/resetpassword/:token` | Reset password using token |

### **TODO Routes**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/todos` | Create a new todo |
| GET | `/api/todos` | Get all todos for the logged-in user |
| GET | `/api/todos/:id` | Get a single todo by ID |
| PUT | `/api/todos/:id` | Update a todo (e.g., change status) |
| DELETE | `/api/todos/:id` | Delete a todo |

### **Advanced Features**
| Feature | Example Query |
|---------|--------------|
| Filter by status | `/api/todos?status=ACTIVE` |
| Search tasks | `/api/todos?search=project` |
| Sort by deadline | `/api/todos?sort=deadline` |
| Sort by status | `/api/todos?sort=status` |
| Combined query | `/api/todos?status=ACTIVE&search=project&sort=deadline` |

---

## 🏃‍♂️ Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2️⃣ Install Dependencies
```sh
npm install
cd client && npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the **root directory** and add the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
JWT_EXPIRE=30d
```

### 4️⃣ Run the Application
#### 🚀 Start the Backend Server
```sh
cd backend
npm start
```
#### 💻 Start the Frontend
```sh
cd client
npm run dev
```
The frontend will be available at `http://localhost:5173` and backend at `http://localhost:5000`.

---

## 📸 Screenshots
![Home Page](https://via.placeholder.com/800x400)
![Todo List](https://via.placeholder.com/800x400)

---



