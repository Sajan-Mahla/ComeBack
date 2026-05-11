const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobile_No:{type: String, required: true},
    DOB: {type: Date, required: true}

})

module.exports = mongoose.model("User",userSchema);