**SMART TRAFFIC MANAGEMENT SYSTEM**

**A Full-Stack Intelligent Traffic Routing, Monitoring & Visualization Platform**

👥 **Collaborators Frontend**
**Hilda Waringa**
**Email**:hildamuritu@gmail.com
**GitHub**: https://github.com/Hilda-18

**Collaborater Backend**
**Stephen Henya**
**Email**:
**Github**:

📌 **Project Overview**

The Smart Traffic Management System is a full-stack application designed to manage and visualize traffic routes across different regions.
It provides an admin interface for creating, updating, and deleting traffic routes, plus a modern interactive map for viewing all routes visually.

The system aims to modernize real-time road monitoring and lay the foundation for future features like congestion alerts, AI predictions, and integrated navigation.

✨ Features
🖥️ **Frontend**

Interactive Leaflet-based map view
Modern UI styled with TailwindCSS
Fully responsive and mobile-first
Route Dashboard with CRUD functionality
Animated UI components and gradients
Login & authentication UI (backend ready)
User-friendly Navigation bar
Beautiful transitions & layout structure

⚙️** Backend**

RESTful API built with Express.js
MongoDB database via Mongoose
CRUD operations for route management
Proper error handling & validation
CORS enabled for frontend communication
Scalable folder structure

🛠️ **Tech Stack**
Frontend
React (Vite)
TailwindCSS
Axios
React Router DOM
Leaflet Maps

**Backend**

Node.js
Express.js
MongoDB + Mongoose
dotenv
CORS

📂 Folder Structure
📁 Smart-Traffic-Management-System
│
├── 📁 Backend
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── 📁 Frontend
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── index.html
│
└── README.md

**🚀 Installation & Setup**
1️⃣ Clone Repository
git clone <your-repository-link>

⚙️ Backend Setup
cd Backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your-mongo-connection-string


Start backend:

npm start

🖥️ Frontend Setup
cd Frontend
npm install
npm run dev


Your frontend will run on:

http://localhost:5173/


Backend runs on:

http://localhost:5000/

🔌 API Documentation
Base URL
http://localhost:5000/api/routes

Endpoints
Method	Endpoint	Description
GET	/	Fetch all routes
GET	/:id	Fetch a single route
POST	/	Create new route
PUT	/:id	Update existing route
DELETE	/:id	Delete route
📝 Sample Route JSON
{
  "name": "Thika Superhighway",
  "location": "Nairobi",
  "status": "Heavy Traffic",
  "description": "Congestion near Githurai"
}

🗺️ Frontend Pages Overview
✔ Dashboard

Displays all routes with edit/delete actions.

✔ Add New Route

Form to create new route entries.

✔ Map View

Leaflet map showing all saved routes.

✔ Login Page

Prepared for backend authentication.

📸 Screenshots (Add After Deployment)
![Dashboard](link-here)
![Map View](link-here)
![Login Page](link-here)


You will update these once hosting is done.

**🌐 Live Demo (Placeholders Until Deployment)**

**Frontend Live Link: coming-soon**

**Backend API Live Link: coming-soon**

**Pitch Deck:*https://assets.api.gamma.app/export/pptx/f3rjqyvopoatmzz/1a378295bad9fdafc83535d984d87531/Smart-Traffic-Management-System.pptx*

**🛣️ Future Improvements**

🔹 Integrated M-Pesa or Stripe payments
🔹 Real-time live traffic alerts
🔹 AI-powered congestion prediction
🔹 User authentication with JWT
🔹 Admin profile & audit logs
🔹 More detailed map layers
🔹 Push notifications
🔹 Multi-role access (Admin / User)
🔹 Beautiful analytics dashboard

🤝** Contributing**

Fork repo
Create a new branch
Make improvements
Create a Pull Request
