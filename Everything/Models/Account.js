const mongoose = require("mongoose");

const acccountSchema = new mongoose.Schema({
    UserId: String,
    accountNumber: {
        type: String,
        unique: true
    },
    name: String,
    dob: String, 
    balance :{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Account", acccountSchema);