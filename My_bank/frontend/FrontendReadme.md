# 🏦 Mini Banking System (Full Stack)

A simple full-stack banking application built using Node.js, Express, MongoDB, and Vanilla JavaScript.

This project allows users to register, login, create accounts, and perform basic banking operations like deposit, withdrawal, and transaction history.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login with JWT)
- 🏦 Account Creation with unique account number
- 💰 Deposit Money
- 💸 Withdraw Money (No negative balance allowed)
- 📊 Check Account Balance
- 📜 Transaction History
- 🔗 Frontend + Backend Integration

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Frontend
- HTML
- CSS (basic)
- JavaScript (Fetch API)

---

## 📂 Project Structure
My_bank/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   └── app.js---

## ⚙️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo### 2. Install dependencies
npm install### 3. Create .env file
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key### 4. Run backend server
npx nodemon app.js### 5. Run frontend
Simply open:
frontend/index.htmlin your browser.

---

## 🔗 API Endpoints

### 🔐 Auth
| Method | Endpoint |
|--------|----------|
| POST | /auth/register |
| POST | /auth/login |

### 🏦 Account
| Method | Endpoint |
|--------|----------|
| POST | /createAccount |
| GET | /account |

### 💰 Transactions
| Method | Endpoint |
|--------|----------|
| POST | /deposit |
| POST | /withdraw |
| GET | /balance?accountNumber=xxx |
| GET | /transactions/:accountNumber |

---

## 📌 Important Rules

- ❌ Account balance cannot go negative
- ❌ One account per user
- ✅ Account linked with userId, name, DOB
- ✅ All transactions are stored
