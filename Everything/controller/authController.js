const User = require("../Models/user")
const sendMail = require("../Utils/sendMail")
const { SendOTP, verifyOTP } = require("../utils/otp")

const bcrypt = require("bcrypt");

// register

const register = async (req,res) => {
    try{
        const {email,password,mobile_No,DOB} = req.body;

        if(!email || !password || !mobile_No || !DOB){
            return res.status(400).json({message: "All feilds required"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            email,
            password: hashedPassword,
            mobile_No,
            DOB
        })

        await user.save();

        await sendMail(
            email,
            "Welcome",
            `<h1>Welcome!</h1> <p>You have successfully registered. </p>`
        )

        res.status(201).json({message: "User registered"});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


// login
const jwt = require("jsonwebtoken");

const login = async (req,res) =>{
    try{
        const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
    }

   SendOTP(user.mobile_No)
res.json({ message: "OTP sent to your mobile number" })
}catch(err){
    res.status(500).json({message: err.message})
}
}

const verifyLoginOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body

    const result = verifyOTP(phone, otp)

    if (result === "success") {
      const user = await User.findOne({ mobile_No: phone })
      const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
      res.json({ token })
    } else if (result === "blocked") {
      res.status(400).json({ message: "Too many attempts! Request a new OTP" })
    } else if (result === "wrong") {
      res.status(400).json({ message: "Wrong OTP!" })
    } else {
      res.status(400).json({ message: "No OTP found! Login again" })
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {register,login, verifyLoginOTP};
