const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(express.json());

mongoose.connect("wo wo wait")
.then(() => console.log("Mongo Conneccted"))
.catch(err => console.log(err));



// ******************** SCHEMA(s) *********************
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})
const User = mongoose.model("User", userSchema)

const noteSchema = new mongoose.Schema({
    userId: String,
    title: String,
    content: String
})
const Note = mongoose.model("Note", noteSchema)



// ******************** REGISTER *********************
app.post("/register", async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        res.json({message: "All feilds required"});
    }

    const newUser = new User({email, password});
    await newUser.save();
    
        res.json({message: "User saved in Database"});

})

// ******************** LOGIN *********************
app.post("/login", async (req,res) =>{
    const  {email, password} = req.body;

    const user = await User.findOne({email,password});

    if(user){
        res.json({
            message: "Login successfull",
            userId: user._id
        });
    } else {
        res.json({message: "Invlaid Credentials"})
    }
})

// ******************** NOTE(s) *********************
app.post("/notes", async(req,res) =>{
    const {userId,title,content} = req.body;

    if(!userId || !content){
        res.status(400).json({message: "Missing feilds"});
    }

    const note = new Note({userId,title,content});
    await note.save();

    res.status(201).json({message: "Note saved in database"})
})

// ******************** GET NOTE(s) BY ID *********************
app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching note" });
  }
});
// ********************  NOTE- DELETE & UPDATE *********************
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    // ✅ Validate ID format (prevents crashes)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findById(id);

    // ✅ Not found
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // ✅ Authorization check
    if (!userId || note.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Delete
    await Note.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting note" });
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query; // for now (later replace with JWT)

    // ✅ Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    // ✅ Find note first
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // ✅ Authorization check
    if (!userId || note.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Update note
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedNote);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating note" });
  }
});

app.listen(3000, () =>{
    console.log("Server running in port 3000");
})
