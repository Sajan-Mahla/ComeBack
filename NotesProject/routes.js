const express = require("express");
const router = express.Router();
const {CreateNote,getNote,deleteNote,updateNote} = require("./controllers");

router.post("/createNote", CreateNote);
router.get("/getNote/:userId", getNote);
router.delete("/deleteNote/:id", deleteNote);
router.put("/updateNote/:id",updateNote);

module.exports = router;




