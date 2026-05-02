const Account = require("../models/Account");
const Transaction = require("../models/Transaction")

///////////// deposit /////////////////////
const deposit = async (req,res) => {
    try{
        const {accountNumber, amount} = req.body;

        await Transaction.create({
            accountNumber,
            type: "deposit",
            amount
        })

        if(!accountNumber || !amount){
            return res.status(400).json({message: "All feilds required"})
        }

        const account = await Account.findOne({accountNumber});

        if(!account){
            return res.status(404).json({message: "Account not found"});
        }

        account.balance += Number(amount);
        await account.save();

        res.json({
            message: "Amout deposited",
            balance: account.balance
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

//////////////// withdraw ///////////////////
const withdraw = async (req,res) => {
    try{
        const {accountNumber ,amount } = req.body;

        await Transaction.create({
            accountNumber,
            type: "withdraw",
            amount
        })

        if(!accountNumber || !amount){
            return res.status(400).json({message: "All fiels required"});
        }

        const account = await Account.findOne({accountNumber});

        if(!account){
            return res.status(404).json({message: "Account not found"})
        }

        if(account.balance < amount){
            return res.status(400).json({message: "Insufficient balance"});
        }

        account.balance -= Number(amount);
        await account.save();

        res.json({
            message: "Amount withdrawn",
            balance: account.balance
        })
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

///////////////////// check balance////////////////////////
const getBalance = async (req,res) => {
    try{
        const {accountNumber} = req.query;

        if(!accountNumber){
            return res.status(400).json({message: "Account number required"});
        }

        const account = await Account.findOne({ accountNumber});

        if(!account){
            return res.status(404).json({message: "Account not found"});
        }

        res.json({
            balance: account.balance
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

///////////////////// Transaction History ////////////////////////
const getTransaction = async (req,res) =>{
    try{
        const {accountNumber} = req.params;

        if(!accountNumber){
            return res.status(400).json({
                message: "Account number required"
            });
        }

        const transctions = await Transaction.find({ accountNumber})
        .sort({date: -1});

        res.json({
            count: transctions.length,
            transctions   
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}



module.exports = { deposit, withdraw,getBalance,getTransaction};