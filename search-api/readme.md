🔍 Mini Search API

A simple Node.js + Express API to search notes using query parameters.

---

🚀 Features

- 🔎 Search notes using "?search=keyword"
- ⚡ Fast filtering (case-insensitive)
- 🧠 Clean and beginner-friendly logic

---

🛠️ Tech Stack

- Node.js
- Express.js

---

📌 Endpoint

GET /search

http://localhost:3000/search?search=apple

---

✅ Example Response

{
  "result": [
    "apple note",
    "apple backend"
  ]
}

---

💡 How it works

- Takes input from query params
- Filters data using ".includes()"
- Returns matching results

---

👨‍💻 Author

Built with consistency (and a little attitude 😐)
