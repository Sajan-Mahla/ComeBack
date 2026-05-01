📝 Notes API (Search + Pagination + Mongo)

A simple yet powerful backend API built with Node.js, Express, and MongoDB.

«Started with confusion 🥀
Ended with a working backend 🔥»

---

🚀 Features

- 🔎 Search notes using query ("?search=apple")
- 📄 Pagination support ("?page=1&limit=2")
- 🗄️ MongoDB integration
- ⚡ Fast and clean API responses

---

📌 Endpoint

GET /notes

http://localhost:3000/notes?userId=User1&search=apple&page=1&limit=2

---

✅ Example Response

{
  "notes": [
    {
      "_id": "...",
      "userId": "User1",
      "title": "Apple note"
    }
  ],
  "total": 2,
  "page": 1,
  "totalPages": 1
}

---

🧠 What I Learned

- Query parameters handling
- MongoDB filtering using "$regex"
- Pagination with ".skip()" & ".limit()"
- Debugging real backend issues (case sensitivity 🙂)

---

👨‍💻 Author(Sajan)

Built with consistency, frustration, and finally… clarity 😐
