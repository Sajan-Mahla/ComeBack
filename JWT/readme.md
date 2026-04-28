🔐 Auth + Notes API (Node.js + MongoDB)

A simple backend REST API with authentication (JWT) and notes management.

---

🚀 Features

- 🔐 User Registration & Login (JWT Auth)
- 🔑 Password Hashing using bcrypt
- 🛡️ Protected Routes with Middleware
- 📝 Notes CRUD (Create, Read, Update, Delete)
- 📄 Pagination Support
- 🌐 MongoDB Atlas Integration

---

🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

📁 Project Structure

project/
├── config/
│   └── db.js
├── models/
│   ├── User.js
│  
├── controllers/
│   ├── authController.js
│   
├── routes/
│   ├── authRoutes.js
│   
├── middleware/
│   └── authMiddleware.js
├── app.js
├── .env
└── package.json

---

⚙️ Setup

1. Install dependencies

npm install

2. Create ".env"

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

3. Run server

npx nodemon app.js

---

🌐 Base URL

http://localhost:3000

---

🔐 Auth Routes

➕ Register

POST /register

{
  "email": "user@test.com",
  "password": "123456"
}

---

🔑 Login

POST /login

{
  "email": "user@test.com",
  "password": "123456"
}

Response:

{
  "token": "your_jwt_token"
}

---

❌ Error Handling

Code| Meaning
400| Bad Request
401| Unauthorized
404| Not Found
500| Server Error

---

🔮 Future Improvements

- User roles (admin/user)
- Refresh tokens
- Rate limiting
- Input validation (Joi/Zod)
- Deployment (Render/Railway)

---

👨‍💻 Author

Sajan Mahla

«Built with consistency, struggle, and a lot of debugging.»
