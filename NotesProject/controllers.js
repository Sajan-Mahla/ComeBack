// CONNECT DB
const mongoose = require("mongoose");
const DataBase = async() =>{
    try{
        await
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }catch(err){
        console.log("DB Error: ",err.message);
        process.exit(1);
    }
}
DataBase();

// SCHEMA(s)

const noteSchema = new mongoose.Schema({
    userId:String,
    title: String,
    content: String
})

const Note = mongoose.model("Note", noteSchema);


// CREATE NOTES(s)
const CreateNote = async(req,res) =>{
    try{
    const {userId, title, content} = req.body;

    if(!title || !content || !userId) {
       return res.status(400).json({message: "All Fields Required"})
    }
    
    const note = new Note ({userId, title, content})
    await note.save();
    res.status(201).json({message: "Note saved"})
}catch(error){
    res.status(500).json({message: error.message})
}
}

// GET NOTES(s)
const getNote = async(req,res) => {
    try{
        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({message: "UserId Required"})
        }

        const notes = await Note.find({ userId: userId});

        if(notes.length == 0){
            return res.status(404).json({message: "No notes found"})
        }

        res.status(200).json({
            message: "Notes fetched successfully",
            length: notes.length,
            notes
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// DELETE NOTE(s)
 const deleteNote = async(req,res) => {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"})
        }
        return res.status(200).json({message: "Note deleted"})
    } catch(err){
        res.status(500).json({message: "Error in deleting note"})
    }
 }

 // UPDATE Note(s)
 const updateNote = async (req,res) => {
    try{
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
           { returnDocument: 'after' }
        )
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"})
        }
        return res.status(200).json({updatedNote})

    }catch(err){
         res.status(500).json({message: "Error Updating note"})
    }
 }

 module.exports = {DataBase,CreateNote,getNote,deleteNote,updateNote}