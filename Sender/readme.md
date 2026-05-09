# 📬 Messaging System — Node.js

A production-grade messaging system built with Node.js covering Email, SMS, OTP verification, Rate Limiting and Security.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Nodemailer (Email)
- Twilio (SMS & OTP)
- express-rate-limit (Rate Limiting)
- Helmet (Security Headers)
- dotenv (Environment Variables)

---

## 📁 Project Structure

```
Sender/
├── mailing_thing/
│   └── ToMailSender.js      # Email sender
├── messaging_thing/
│   ├── sms/
│   │   └── twilio.js        # SMS sender
│   └── otp/
│       └── twilioOtp.js     # OTP system with rate limiting & helmet
└── .env                     # Credentials (never push this!)
```

---

## ⚙️ Setup

```bash
npm install nodemailer twilio express express-rate-limit helmet dotenv
```

Create a `.env` file:

```
TWILIO_NUMBER=+13853238554
TWILIO_SID=your_account_sid
TWILIO_AUTH=your_auth_token
USER=your_gmail
PASS=your_app_password
```

> ⚠️ Always add `.env` to `.gitignore` before pushing to GitHub!

---

## 📧 Email — Nodemailer

Sends emails via Gmail SMTP using Nodemailer.

```js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: "your_gmail@gmail.com",
        pass: "your_app_password"
    }
});

function sendMail(to, sub, msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    });
    console.log("Email Sent");
}

sendMail("recipient@gmail.com", "Subject here", "Message here");
```

### 📌 SMTP Ports

| Port | Security | Use When |
|------|----------|----------|
| 465 | SSL/TLS | `secure: true` — small projects |
| 587 | STARTTLS | `secure: false` — production |
| 25 | None | Blocked by most ISPs |
| 2525 | Optional | Fallback port |

### 📌 Gmail App Password
- Go to **myaccount.google.com → Security → 2-Step Verification → App Passwords**
- Generate a 16-character password
- Use it as `pass` in Nodemailer — never your real Gmail password

---

## 📱 SMS — Twilio

Sends SMS messages using the Twilio API.

```js
const twilio = require("twilio");

const client = twilio("ACCOUNT_SID", "AUTH_TOKEN");

function SendSms(to, message) {
    client.messages.create({
        to: to,
        from: "+1xxxxxxxxxx",
        body: message
    });
    console.log("SMS Sent");
}

SendSms("+917973441373", "Hello from Node.js!");
```

### 📌 Twilio Setup
1. Sign up at **twilio.com**
2. Get **Account SID** and **Auth Token** from dashboard
3. Get a free phone number
4. Verify recipient numbers (trial accounts only)

---

## 🔐 OTP System

Full OTP generation, sending, verification with attempt limiting.

```js
const twilio = require("twilio");
const express = require("express");
const app = express();

app.use(express.json());

const client = twilio("ACCOUNT_SID", "AUTH_TOKEN");
let otpStore = {};

// Generate & Send OTP
function SendOTP(phoneNumber) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
    otpStore[phoneNumber] = {
        otp: otp,
        attempts: 0
    };

    client.messages.create({
        to: phoneNumber,
        from: "+1xxxxxxxxxx",
        body: `your otp is: ${otp}`
    });

    console.log(`OTP sent!`);
}

// Verify OTP
function verifyOTP(phoneNumber, enteredOTP) {
    if (!otpStore[phoneNumber]) {
        return "no_otp";
    }

    if (otpStore[phoneNumber].attempts >= 3) {
        delete otpStore[phoneNumber];
        return "blocked";
    }

    if (otpStore[phoneNumber].otp == enteredOTP) {
        delete otpStore[phoneNumber];
        return "success";
    } else {
        otpStore[phoneNumber].attempts++;
        return "wrong";
    }
}

// Routes
app.post("/send-otp", (req, res) => {
    const { phone } = req.body;
    SendOTP(phone);
    res.json({ message: "OTP Sent!" });
});

app.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;
    const result = verifyOTP(phone, otp);

    if (result === "success") res.json({ message: "OTP Verified! ✅" });
    else if (result === "blocked") res.json({ message: "Too many attempts! Request a new OTP ❌" });
    else if (result === "wrong") res.json({ message: `Wrong OTP! ${otpStore[phone].attempts}/3 attempts used` });
    else res.json({ message: "No OTP found! Request a new one" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### 📌 OTP Flow

```
User enters phone → POST /send-otp
→ OTP generated & stored in otpStore
→ SMS sent via Twilio
→ User receives OTP on phone
→ User enters OTP → POST /verify-otp
→ Verified ✅ or Blocked after 3 wrong attempts ❌
```

---

## 🚦 Rate Limiting — express-rate-limit

Prevents users from spamming your API.

```js
const rateLimit = require("express-rate-limit");

const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,                    // max 5 requests per window
    message: { message: "Too many OTP requests! Try again after 15 minutes" }
});

const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many verify attempts! Try again after 15 minutes" }
});

app.post("/send-otp", otpLimiter, (req, res) => { ... });
app.post("/verify-otp", verifyLimiter, (req, res) => { ... });
```

### 📌 windowMs Explained

| Code | Value |
|------|-------|
| `1000` | 1 second |
| `60 * 1000` | 1 minute |
| `15 * 60 * 1000` | 15 minutes |
| `60 * 60 * 1000` | 1 hour |
| `24 * 60 * 60 * 1000` | 24 hours |

Returns **HTTP 429 Too Many Requests** when limit is exceeded.

---

## 🛡 Helmet — Security Headers

Protects your API by setting secure HTTP headers automatically.

```js
const helmet = require("helmet");
app.use(helmet());
```

One line — Helmet adds 14+ security headers including clickjacking protection, XSS protection, hiding server info and more.

---

## 🚀 API Routes

| Method | Route | Limiter | Description |
|--------|-------|---------|-------------|
| POST | `/send-otp` | 5 req / 15 min | Sends OTP to phone |
| POST | `/verify-otp` | 10 req / 15 min | Verifies OTP |

---

## 📮 Testing with Postman

**Send OTP:**
```json
POST http://localhost:3000/send-otp
{
    "phone": "+917973441373"
}
```

**Verify OTP:**
```json
POST http://localhost:3000/verify-otp
{
    "phone": "+917973441373",
    "otp": "123456"
}
```

---

## 🔐 Security Checklist

- ✅ Rate limiting — max requests per time window
- ✅ Attempt limiting — max 3 wrong OTP attempts
- ✅ Helmet — secure HTTP headers
- ✅ Environment variables — credentials in `.env`
- ✅ `.gitignore` — never push `.env` to GitHub
- ✅ OTP deleted after verification — no reuse

---

## 📝 What I Learned

- SMTP protocol and ports (465 vs 587)
- Gmail App Passwords for third party apps
- Sending emails with Nodemailer
- Sending SMS with Twilio
- OTP generation using Math.random()
- OTP verification with attempt limiting
- Rate limiting with express-rate-limit and windowMs
- Security headers with Helmet
- Environment variables with dotenv
- Testing APIs with Postman
- How ports get blocked by ISPs
