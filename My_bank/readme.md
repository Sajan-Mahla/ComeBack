# 🏦 My Bank API

> A secure, production-ready REST Banking API built with Node.js, Express & MongoDB.


---

## ✨ Features

- 🔐 JWT Authentication (Register & Login)
- 🏧 Create Bank Accounts
- 💰 Deposit & Withdraw Funds
- 📊 Real-time Balance Checking
- 📜 Full Transaction History
- 🛡️ Protected Routes via Auth Middleware
- ❌ Insufficient Balance Protection

---

## 📁 Project Structure

```
My_bank/
├── app.js
├── .env
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Account.js
│   └── Transaction.js
├── controllers/
│   ├── authController.js
│   ├── accountController.js
│   └── transactionController.js
├── routes/
│   ├── authRoutes.js
│   ├── accountRoutes.js
│   └── transactionRoutes.js
└── middleware/
    └── authMiddleware.js
```

---

## 🧠 Code Synopsis

### 🔑 Auth Flow
User registers with email & password → password is **bcrypt hashed** → saved to MongoDB.
On login, password is compared → if valid, a signed **JWT token** is returned (expires in 1h).

```js
const hashedPassword = await bcrypt.hash(password, 10);
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
```

### 🛡️ Auth Middleware
Every protected route passes through `verifyToken`. It extracts the Bearer token from the `Authorization` header and verifies it using the JWT secret.

```js
const token = authHeader.split(" ")[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // userId now available in all protected routes
```

### 🏧 Account Creation
A random 9-digit account number is generated and linked to the logged-in user's ID from the JWT payload.

```js
const accountNumber = Math.floor(Math.random() * 1000000000).toString();
const account = new Account({ userId, accountNumber, name, dob });
```

### 💰 Deposit & Withdraw
Validates input → finds account → updates balance → saves transaction record to DB.
Withdraw also checks for **insufficient balance** before deducting.

```js
// Deposit
account.balance += Number(amount);

// Withdraw
if (account.balance < amount) return res.status(400).json({ message: "Insufficient balance" });
account.balance -= Number(amount);
```

### 📜 Transaction History
Fetches all transactions for an account number, sorted by date (newest first).

```js
const transactions = await Transaction.find({ accountNumber }).sort({ date: -1 });
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/my-bank-api.git
cd my-bank-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Run the server
```bash
npx nodemon app.js
```

Server runs on `http://localhost:3000` 🚀

---

## 📡 API Endpoints

### 🔑 Auth
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | `/auth/register` | ❌ | `{ email, password }` |
| POST | `/auth/login` | ❌ | `{ email, password }` |

### 🏧 Account
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | `/createAccount` | ✅ Bearer | `{ name, dob }` |

### 💸 Transactions
| Method | Endpoint | Auth | |
|--------|----------|------|-|
| POST | `/deposit` | ✅ Bearer | `{ accountNumber, amount }` |
| POST | `/withdraw` | ✅ Bearer | `{ accountNumber, amount }` |
| GET | `/balance?accountNumber=` | ✅ Bearer | — |
| GET | `/transactions/:accountNumber` | ✅ Bearer | — |

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)**. After logging in, include the token in every protected request:

```
Authorization: Bearer <your_token_here>
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Nodemon | Dev Server |

---

## 👨‍💻 Author: Sajan Mahla

Built with 💪 and 4 hours of grind.

> *"4 ghante ki mehnat, ek poora banking API."*

---

## 📄 License

MIT © 2026
