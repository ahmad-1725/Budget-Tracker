# ExpenseIQ — Smart AI Expense Tracker

ExpenseIQ is a full-stack MERN application that helps users manage expenses, track financial habits, visualize spending analytics, and receive AI-powered financial insights.

The application combines modern dashboard analytics with an AI financial assistant to create a smart and interactive expense tracking experience.

---

# Features

## Authentication

* User registration and login
* JWT authentication
* Protected routes
* Persistent login sessions

---

## Expense Management

* Add income and expenses
* Edit transactions
* Delete transactions
* View transaction history
* User-specific financial data

---

## Dashboard Analytics

* Total income tracking
* Total expense tracking
* Current balance calculation
* Monthly expense analytics
* Category-based spending analysis
* Recent transaction history

---

## Charts & Visualization

* Pie chart for category spending
* Bar chart for monthly expenses
* Interactive financial dashboard

Built using Recharts.

---

## Smart Insights

ExpenseIQ automatically generates smart financial insights such as:

* Highest spending category
* Savings analysis
* Expense warnings
* Spending behavior summaries

---

## AI Financial Assistant

Integrated with OpenRouter AI to provide intelligent financial recommendations.

Example prompts:

* "How can I reduce my expenses?"
* "What category am I overspending on?"
* "Give me savings advice."

The AI assistant analyzes user spending data and provides personalized financial suggestions.

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Recharts
* Axios
* Sonner

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

## AI Integration

* OpenRouter AI API

---

# Project Structure

## Frontend

```txt
src/
├── components/
├── pages/
├── services/
├── charts/
├── utils/
└── layouts/
```

---

## Backend

```txt
server/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
└── utils/
```

---

# API Routes

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Expenses

```http
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

---

## Dashboard

```http
GET /api/dashboard
```

---

## AI Assistant

```http
POST /api/ai/chat
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ahmad-1725/Budget-Tracker/
```

---

## Backend Setup

```bash
cd expenseiq-backend
npm install
npm run dev
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
OPENROUTER_API_KEY=YOUR_API_KEY
```

---

## Frontend Setup

```bash
cd expenseiq-frontend
npm install
npm run dev
```

---

# Screenshots

## Login Page


---

## Dashboard
<img width="1885" height="877" alt="image" src="https://github.com/user-attachments/assets/7a5bcd52-c8f5-49d0-8858-e9ffdd684edf" />


---

## Expense Management
<img width="1879" height="878" alt="image" src="https://github.com/user-attachments/assets/c004bcc4-16c0-40f3-b7f6-cb41abdba3e4" />


---

## AI Financial Assistant
<img width="705" height="701" alt="image" src="https://github.com/user-attachments/assets/574396e1-9b9b-4ddb-adc1-d2d97fb05418" />



---

# Future Improvements

* Budget planning system
* Expense category filters
* Export reports as PDF
* Dark/light mode toggle
* Multi-currency support

---

# Why ExpenseIQ?

ExpenseIQ was built to demonstrate:

* Full-stack MERN development
* REST API architecture
* JWT authentication
* Database design
* Dashboard analytics
* AI integration
* Responsive modern UI

The project focuses on creating a practical, visually impressive, and intelligent financial tracking application.

---

# Author

Ahmad Ilyas
MERN Stack Developer
