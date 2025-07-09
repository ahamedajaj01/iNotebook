# 📒 iNotebook

**iNotebook** is a full-stack MERN (MongoDB, Express, React, Node.js) web application that lets users securely create, edit, and manage their personal notes from any device.

---

## 🌐 Live Demo

> Coming Soon... (Optional: Add your deployed link here)

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Context API, Tailwind CSS / Bootstrap (if used)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT-based secure login/signup
- **Email System:** Password reset via Nodemailer (optional)

---

## 🚀 Features

- 🔐 User Authentication (Signup / Login)
- 📝 Create, edit, and delete notes
- 💾 Notes stored securely in MongoDB
- 👀 Protected routes with `PrivateRoute` / `PublicRoute`
- 🌙 Dark/Light Mode (optional if added)
- 🔔 Alert system for user feedback
- 📱 Fully responsive design

---

## 📁 Folder Structure

```plaintext
iNotebook/
│
├── backend/              # Node.js + Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── frontend/             # React frontend
│   ├── components/
│   ├── context/          # React Context for Notes
│   ├── pages/
│   └── App.js
│
├── .env                  # Environment variables
└── README.md
