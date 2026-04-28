const User = require("../models/User");

const bcrypt = require("bcrypt");

// ***************** REGISTER ********************
const register = async (req, res) =>{
    try{
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({message: "All feilds required"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User ({ email,
            password: hashedPassword
        })

        await user.save();

        res.status(201).json({message: "User registered"});
    } catch(err){
        res.status(500).json({message: err.message});

    }
}

// ****************** LOGIN ***********************
const jwt = require("jsonwebtoken");

const login = async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    res.json({token})
}

module.exports = { register, login }