# 🏦 My_Bank — Full Stack Banking System

A modern full-stack banking application built using **Node.js, Express.js, MongoDB, JWT Authentication, OTP Verification, and Vanilla JavaScript Frontend**.

---

# 🚀 Features

- 🔐 JWT Authentication
- 📱 OTP-Based Login Verification
- 🧾 User Registration & Login
- 💰 Deposit Money
- 💸 Withdraw Money
- 🏦 Account Balance Checking
- 🔒 Protected Routes using Middleware
- 📦 MongoDB Database Integration
- 🌐 Frontend + Backend Integration
- ⚡ Nodemon Development Server

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Twilio
- Nodemailer
- dotenv

## Frontend
- HTML
- CSS
- JavaScript

---

# 📂 Project Structure

```bash
My_Bank/
│
├── public/
│   ├── index.html
│   ├── dashboard.html
│   └── app.js
│
├── routes/
│   ├── authRoutes.js
│   ├── accountRoutes.js
│   └── transactionRoutes.js
│
├── controller/
│   ├── authController.js
│   ├── accountController.js
│   └── transactionController.js
│
├── Models/
│   ├── user.js
│   ├── Account.js
│   └── Transaction.js
│
├── middleware/
│   └── authMiddleware.js
│
├── Utils/
│   ├── otp.js
│   └── sendMail.js
│
├── .env
├── app.js
├── db.js
├── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <your-repo-link>
cd My_Bank
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🔑 Setup Environment Variables

Create `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_jwt_secret

MAIL_USER=your_email
MAIL_PASS=your_email_password

TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

---

# ▶️ Run Project

## Development Mode

```bash
npx nodemon app.js
```

OR

```bash
npm run dev
```

---

# 🌐 Open in Browser

```txt
http://localhost:3000
```

---

# 🔐 Authentication Flow

1. User logs in using email & password
2. OTP gets sent to registered mobile/email
3. User verifies OTP
4. JWT Token generated
5. User redirected to dashboard

---

# 📡 API Endpoints

## Auth Routes

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Verify OTP

```http
POST /api/auth/verify-login
```

---

## Account Routes

### Get Balance

```http
GET /api/account/balance/:accountNumber
```

### Deposit Money

```http
POST /api/account/deposit
```

### Withdraw Money

```http
POST /api/account/withdraw
```

---

# 🧠 What I Learned

- Building REST APIs
- JWT Authentication
- OTP Verification System
- MongoDB Integration
- Express Middleware
- Frontend + Backend Integration
- Error Debugging
- Real-World Backend Architecture

---

# 📸 Future Improvements

- ✅ Transaction History
- ✅ Account Creation UI
- ✅ Better Dashboard UI
- ✅ Responsive Design
- ✅ Refresh Tokens
- ✅ Admin Panel
- ✅ Deployment on Render/Vercel

---

# 👨‍💻 Developer

**Sajan Mahla**

Building toward becoming a world-class iOS & Full Stack Engineer 🚀
