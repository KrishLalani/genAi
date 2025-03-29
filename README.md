# Mini Data Query Simulation Engine

A lightweight backend service that simulates a simplified version of an AI-powered Gen AI Analytics query system. This system allows users to process natural language queries and convert them into SQL-like commands for querying mock databases.

## 🚀 Project Overview

This project implements a backend API for:

- Simulating AI-powered data query processing.
- Translating natural language to SQL.
- Supporting both SQLite (in-memory) and PostgreSQL databases.
- Providing query validation and explanation.
- Securing endpoints with JWT authentication.

## 📋 Features

- **Natural Language Query Translation**: Converts simple queries to SQL.
- **Mock Database**: Includes tables for `sales`, `transactions`, and `customers`.
- **Endpoints**: For querying, explaining, and validating queries.
- **JWT Authentication**: Secures access to core API routes.
- **Dual Database Support**: Works with SQLite (for quick prototyping) and PostgreSQL (for production-like scenarios).

---

## 🛠️ Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- npm (v9+)
- PostgreSQL (if using a production database)

### Clone the Repository

```bash
git clone https://github.com/your-username/genai-query-simulation.git
cd genai-query-simulation
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
POSTGRES_URI=postgresql://user:password@localhost:5432/genai_db
```

### Run the Service

1. **Start the Service (Development Mode)**

```bash
npm run dev
```

2. **Start the Service (Production Mode)**

```bash
npm start
```

---

## 📚 API Documentation

### Authentication

#### 🔐 Generate JWT Token

```http
POST /api/getToken
```

_Response:_

```json
{
  "token": "your.jwt.token"
}
```

### Query Endpoints

1. **/query** - Execute a natural language query

```http
POST /api/query
Authorization: Bearer your.jwt.token
```

_Request Body:_

```json
{
  "query": "Total sales in Q1"
}
```

_Response:_

```json
{
  "query": "Total sales in Q1",
  "sql": "SELECT * FROM sales WHERE quarter = 'Q1';",
  "results": [
    { "region": "North", "amount": 5000 },
    { "region": "South", "amount": 7000 }
  ]
}
```

2. **/explain** - Explain the natural language query

```http
POST /api/explain
Authorization: Bearer your.jwt.token
```

_Request Body:_

```json
{
  "query": "Customers in the North region"
}
```

_Response:_

```json
{
  "query": "Customers in the North region",
  "explanation": "Fetches customer data for the North region."
}
```

3. **/validate** - Validate query feasibility

```http
POST /api/validate
Authorization: Bearer your.jwt.token
```

_Request Body:_

```json
{
  "query": "Invalid query example"
}
```

_Response:_

```json
{
  "error": "Unsupported query"
}
```

---

## 📊 Sample Queries

- "Total sales in Q1"
- "Transactions by customer Alice"
- "Customers in the North region"

---

## 📤 Testing with cURL or Postman

### Generate Token

```bash
curl -X POST http://localhost:3000/api/auth/token
```

### Execute Query

```bash
curl -X POST http://localhost:3000/api/query \n    -H "Authorization: Bearer your.jwt.token" \n    -H "Content-Type: application/json" \n    -d '{"query": "Total sales in Q1"}'
```

### Validate Query

```bash
curl -X POST http://localhost:3000/api/validate \n    -H "Authorization: Bearer your.jwt.token" \n    -H "Content-Type: application/json" \n    -d '{"query": "Transactions by Alice"}'
```

---

## 📦 Project Structure

```
├── config/
│   ├── db.js       # Database connections
│   └── jwt.js      # JWT authentication
├── controllers/
│   └── queryController.js
├── routes/
│   └── queryRoutes.js
├── .env
└── app.js          # Main application entry
```

## 🤝 Contribution

Feel free to fork, open issues, and submit PRs!
KRISH LALANI

