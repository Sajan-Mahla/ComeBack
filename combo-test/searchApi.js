const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" }); // fix from earlier
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

const noteSchema = new mongoose.Schema({
  userId: String,
  title: String
});
const Note = mongoose.model("Note", noteSchema);

app.get("/notes", async (req, res) => {
  try {
    const { userId, search = "", page = 1, limit = 5 } = req.query;

    const query = {
      userId,
      title: { $regex: search, $options: "i" }
    };

    // Fix 1: count total matching documents
    const total = await Note.countDocuments(query);

    // Fix 2: apply pagination and actually return notes
    const notes = await Note.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      notes,          // include the actual notes
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/add", async (req,res) => {
    try{
        const {userId, title} = req.body;

        const note = new Note({userId, title});
        await note.save();

        res.json({
            message: "Note added"
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

app.listen(3000, () => {
  console.log("Server running on PORT: 3000");
});