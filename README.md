# 🚦 SMART TRAFFIC MANAGEMENT SYSTEM

A **Full-Stack Intelligent Traffic Routing, Monitoring & Visualization Platform**.

---

## 👥 Collaborators

| Role          | Name              | Email                    | GitHub                                    |
|---------------|-------------------|--------------------------|-------------------------------------------|
| Frontend Lead | Hilda Waringa     | hildamuritu@gmail.com    | [Hilda-18](https://github.com/Hilda-18)   |
| Backend Lead  | Stephen Henya     | henyastephen@gmail.com   | https://github.com/Stephen-Henya                                     |


---

## 📌 Project Overview

The **Smart Traffic Management System** is a robust full-stack application for efficient traffic route creation, visualization, and admin management. It includes:

- **Admin interface**: CRUD for traffic routes.
- **Modern interactive map**: Visualizes all routes in real-time.
- **Scalable backend**: Ready for future enhancements such as congestion alerts, AI-powered predictions, and integrated navigation.

---

## ✨ Features

### 🖥️ Frontend

- Interactive **Leaflet**-powered map
- Sleek, responsive TailwindCSS UI
- Route Dashboard with CRUD controls
- Animated transitions and clean navigation
- Login & authentication UI (backend-ready)
- Beautiful transitions & gradients

### ⚙️ Backend

- RESTful API with **Express.js**
- Data storage with **MongoDB** and **Mongoose**
- Complete CRUD operations for routes
- Strong error handling & validation
- CORS enabled for frontend communication
- Organized, scalable code structure

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- Axios
- React Router DOM
- Leaflet Maps

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv, CORS

---

## 📂 Folder Structure

```
Smart-Traffic-Management-System/
├── Backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── index.html
└── README.md
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <https://github.com/Hilda-18/PLP-FINAL-PROJECT_SMART-TRAFFIC-SYSTEM>
cd PLP-FINAL-PROJECT_SMART-TRAFFIC-SYSTEM
```

---

### ⚙️ Backend Setup

```bash
cd backend
npm install
```
Create a `.env` file:

```env
PORT=5000
MONGO_URI=your-mongo-connection-string
```

Start backend:
```bash
npm start
```

---

### 🖥️ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

**Frontend runs on:** [http://localhost:5173/](http://localhost:5173/)  
**Backend runs on:** [http://localhost:5000/](http://localhost:5000/)

---

## 🔌 API Documentation

Base URL: `http://localhost:5000/api/routes`

| Method | Endpoint | Description            |
|--------|----------|------------------------|
| GET    | /        | Fetch all routes       |
| GET    | /:id     | Fetch a single route   |
| POST   | /        | Create new route       |
| PUT    | /:id     | Update existing route  |
| DELETE | /:id     | Delete route           |

### 📝 Sample Route JSON

```json
{
  "name": "Thika Superhighway",
  "location": "Nairobi",
  "status": "Heavy Traffic",
  "description": "Congestion near Githurai"
}
```

---

## 🗺️ Frontend Pages Overview

- **Dashboard**: View, edit, and delete routes.
- **Add New Route**: Form for adding routes.
- **Map View**: Visualize all routes on an interactive map.
- **Login Page**: Placeholder for authentication integration.

---


## 🌐 Live Demo

- **Frontend:** [Live Link](https://plp-final-project-smart-traffic-sys-three.vercel.app/ )
- **Backend API:** [Live Link](https://plp-final-project-smart-traffic-system.onrender.com)
- **Pitch Deck:** [View on Gamma](https://smart-traffic-management-jdsjzu0.gamma.site/)

---

## 🛣️ Future Improvements

- Integrated M-Pesa or Stripe payments
- Real-time live traffic alerts
- AI-powered congestion prediction
- User authentication (JWT)
- Admin profile & audit logs
- Detailed map layers
- Push notifications
- Multi-role access (Admin/User)
- Data analytics dashboard

---

## 🤝 Contributing

1. **Fork** this repository
2. **Create** a new branch
3. **Make improvements**
4. **Open a Pull Request**

---

> _Built with passion for smarter and safer roads!_
