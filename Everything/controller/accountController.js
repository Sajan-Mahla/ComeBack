const Account = require("../models/Account");

const createAccount = async (req,res) =>{
    try{
        const {name, dob} = req.body;
        const userId = req.user.userId;

        const accountNumber = Math.floor(Math.random() * 1000000000).toString();

        const account = new Account({
            userId,
            accountNumber,
            name,
            dob
        });
         await  account.save();

         res.json({
            message: "Account created",
            accountNumber
         })
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = { createAccount};