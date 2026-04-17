const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect("") 
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})
const User = mongoose.model("User", userSchema);

const noteSchema = new mongoose.Schema({
    userId: String,
    title: String,
    content: String
})
const Note = mongoose.model("Note", noteSchema);

// ********************** CREATE NOTE **********************
app.post("/notes", async (req, res) => {
    const { userId, title, content } = req.body;
    if (!userId || !title) {
        return res.status(400).json({ message: "Missing fields" })
    }
    const note = new Note({ userId, title, content })
    await note.save();
    res.status(201).json({ message: "Note saved" })
})

// ********************** GET NOTE(S) **********************
app.get("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID received:", id);
        console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(id));

        if (mongoose.Types.ObjectId.isValid(id)) {
            const note = await Note.findById(id);
            console.log("Note found:", note);
            if (!note) return res.status(404).json({ message: "Note not found" });
            return res.status(200).json(note);
        }

        const notes = await Note.find({ userId: id });
        console.log("Notes found:", notes);
        return res.status(200).json(notes);

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: "Error fetching note" })
    }
})

//********************** Notes(s) by userId **********************
app.get("/notes/user/:userId", async(req,res) =>{
    try{
        const notes = await Note.find({userId: req.params.userId});

        if(notes.length == 0){
            return res.status(404).json({message: "No Notes Found"});
        }
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: "Error fetching notes"})
    }
})

// ********************** REGISTER **********************
app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashpassword })
    await newUser.save();
    res.status(201).json({ message: "User saved in DATABASE 🫂" });
});

// ********************** LOGIN **********************
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: "Login SEXFULL 😭" })
    } else {
        res.status(401).json({ message: "Will die a virgin mf." })
    }
})

// ********************** DELETE **********************
app.delete("/notes/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting note" })
    }
});

// ********************** UPDATE **********************
app.put("/notes/:id", async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: "Error updating note" })
    }
})

app.listen(3000, () => {
    console.log("Server started in port 3000");
})
