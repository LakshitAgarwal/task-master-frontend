# ✅ MERN Task Manager App

A full-stack **Task Manager** application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). This app allows users to **add**, **edit**, **complete**, **delete**, and **search** tasks with a clean UI and responsive design.

---

## 🎬 Demo



https://github.com/user-attachments/assets/45024beb-3b72-45b5-960a-f958914f74d8



---

## 🚀 Features

- 📋 **Create** a task with title & description
- ✏️ **Edit** tasks at any time
- ✅ **Mark** tasks as completed or pending
- 🗑️ **Delete** tasks instantly
- 🔍 **Search** through tasks in real-time
- 📱 **Responsive design** for all screen sizes

---

## ⚙️ Tech Stack

### 🧠 Frontend – React

- ReactJS
- Tailwind CSS for styling

### 🛠️ Backend – Node.js + Express.js

- Express.js for API routing
- Node.js as the server runtime
- CORS & body-parser middleware
- RESTful API design

### 🗄️ Database – MongoDB

- MongoDB Atlas (cloud DB)
- Mongoose for schema definition & data modeling

---

## 🏗️ How It Works

### 1. **User opens the app**

- Tasks are fetched from MongoDB using the backend API

### 2. **User can:**

- Add new tasks with `title` & `description`
- Search tasks instantly
- Edit or delete tasks
- Mark tasks as complete (UI changes accordingly)

### 3. **Frontend communicates with Backend via Axios**

- `GET /todos` → Fetch all tasks
- `POST /todos` → Add a new task
- `PUT /todos/:id` → Update a task
- `DELETE /todos/:id` → Delete a task

---

## 🌐 API Endpoints

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| GET    | `/todos`     | Get all tasks                 |
| POST   | `/todos`     | Add a new task                |
| PUT    | `/todos/:id` | Update a task (edit/complete) |
| DELETE | `/todos/:id` | Delete a task                 |

---

## 🌍 Deployment Ideas

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Cyclic
- Database: MongoDB Atlas
