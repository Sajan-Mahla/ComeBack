const express = require("express");
const bcrypt = require("bcrypt");
const app = express();


app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect("NOT_FREE_SHIT");
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
const Note = mongoose.model("Note",noteSchema);

app.post("/notes", async (req,res) =>{
    const { userId, title,content} = req.body;

    if(!userId || !title){
        return res.json({message: "Missing feilds"})
    } 
    const note = new Note({userId, title, content})
    await note.save();

    res.json({ message: "Note saved"})
    
    
}) 

app.get("/notes/:userId", async (req, res)=>{
    const notes = await Note.find({userId: req.params.userId});
    res.json(notes)
})


app.post("/register", async (req,res) =>{
    const {email,password} = req.body;

    if(!email || ! password){
        return res.json({message: "All feild required 🖕"});
    }

    const hashpassword = await
    bcrypt.hash(password, 10);
    const newUser = new User({
        email,password: hashpassword
    })
    await newUser.save();

    res.json({message: "User saved in DATABASE 🫂"});
});

app.post("/login", async(req,res) =>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password,user.password)){
        res.json({message: "Login SEXFULL 😭"})
    } else{
        res.json({message: "Will die a virgin mf."})
    }
})


// ********************** DELETE **********************
app.delete("/notes/:id", async (req,res) =>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
        return res.json({message: "Note not found"});
    }
    res.json({message: "Note deleted"});
    }catch(err){
        res.json({message: "Error deleting note"})
    }
});

app.put("/notes/:id", async(req,res) =>{
    try{
        const{title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true}
        );

        res.json(updatedNote);
    } catch(err){
        res.json({message: "Error updating note"})
    }
})







app.listen(3000, () =>{
    console.log("Server started in port 3000");
})
