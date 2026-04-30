const express = require("express");
const app = express();

app.use(express.json());

const notes = [
    "apple note",
    "banana note",
    "backend project",
    "apple backend",
    "mongo note"
];

app.get("/search", (req,res) => {
   const search = req.query.search || "";



    const filtered = notes.filter(note =>
        note.toLowerCase().includes(search.toLowerCase())
    );

    res.json({
        result: filtered
    });
});

app.listen(3000, ()=>{
    console.log("Server running on Port: 3000");
})