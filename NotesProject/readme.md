# 📝 Notes REST API

A full backend REST API for managing notes, built with Node.js, Express, and MongoDB Atlas.

---

## 🛠️ Tech Stack

- **Node.js** — runtime environment
- **Express.js** — web framework
- **MongoDB Atlas** — cloud database
- **Mongoose** — ODM for MongoDB
- **dotenv** — environment variable management

---

## 📁 Project Structure

```
NotesProject/
├── .env
├── .gitignore
├── app.js
├── controllers.js
├── routes.js
├── package.json
└── node_modules/
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/notes-api.git
cd notes-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in root
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notesdb
```

### 4. Run the server
```bash
node app.js
# or with nodemon
npx nodemon app.js
```

You should see:
```
Server running on 3000
MongoDB Connected
```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000
```

---

### ➕ Create Note
```
POST /createNote
```
**Request Body:**
```json
{
  "userId": "user1",
  "title": "My Note",
  "content": "This is my note content"
}
```
**Response:** `201 Created`
```json
{
  "message": "Note saved"
}
```

---

### 📖 Get Notes by User
```
GET /getNote/:userId
```
**Example:** `GET /getNote/user1`

**Response:** `200 OK`
```json
{
  "message": "Notes fetched successfully",
  "length": 1,
  "notes": [
    {
      "_id": "64abc123...",
      "userId": "user1",
      "title": "My Note",
      "content": "This is my note content",
      "__v": 0
    }
  ]
}
```

---

### ✏️ Update Note
```
PUT /updateNote/:id
```
**Example:** `PUT /updateNote/64abc123...`

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```
**Response:** `200 OK`
```json
{
  "updatedNote": {
    "_id": "64abc123...",
    "userId": "user1",
    "title": "Updated Title",
    "content": "Updated content",
    "__v": 0
  }
}
```

---

### 🗑️ Delete Note
```
DELETE /deleteNote/:id
```
**Example:** `DELETE /deleteNote/64abc123...`

**Response:** `200 OK`
```json
{
  "message": "Note deleted"
}
```

---

## ❌ Error Responses

| Status Code | Meaning |
|---|---|
| `400` | Missing required fields |
| `404` | Note or user not found |
| `500` | Internal server error |

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (default: 3000) |
| `MONGO_URI` | MongoDB Atlas connection string with database name |

---

## 📌 Notes Schema

```js
{
  userId: String,   // ID of the user who owns the note
  title: String,    // Title of the note
  content: String   // Content of the note
}
```

---

## 🚀 Future Improvements

- [ ] User authentication (JWT)
- [ ] Register & Login routes
- [ ] Password hashing (bcrypt)
- [ ] Frontend integration (React)
- [ ] Deploy to Railway / Render

---

## 👨‍💻 Author

**Sajan Mahla**  
Built with 💪 and a lot of bug fixes!
