require("dotenv").config();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const express = require("express");
const twilio = require("twilio");
const { MetadataInstance } = require("twilio/lib/rest/insights/v3/metadata");
const app = express();

app.use(express.json());
app.use(helmet());

const client = twilio( process.env.TWILIO_NUMBER, process.env.TWILIO_AUTH);
// console.log("SID:", process.env.TWILIO_SID);
// console.log("AUTH:", process.env.TWILIO_AUTH);
// console.log("NUMBER:", process.env.TWILIO_NUMBER)

let otpStore = {};

const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: "Too many OTP requests! Try again after 15 minutes"}
})

const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {Message: "Too many Verify requests! Try again after 15 minutes"}
})

function SendOTP(phoneNumber){
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[phoneNumber] = {
        otp: otp,
        attempts: 0
    }

    client.messages.create({
        to: phoneNumber,
        from:process.env.TWILIO_NUMBER,
        body: `your otp is: ${otp}`
    })

    console.log(`your otp is ${otp}`);
}

function verifyOTP(phoneNumber, enteredOTP){
    if(!otpStore[phoneNumber]){
        console.log("No OTP Found");
        return "no_otp";
    }

    if(otpStore[phoneNumber].attempts >= 3){
        delete otpStore[phoneNumber];
        return "blocked"
    }

    if(otpStore[phoneNumber].otp == enteredOTP){
        console.log("OTP Verified")
        delete otpStore[phoneNumber];
        return "success";
    } else {
        otpStore[phoneNumber].attempts++;
        console.log(`Wrong OTP! attempts ${otpStore[phoneNumber].attempts}/3`);
        return "wrong"
    }
}

app.post("/send-otp",otpLimiter, (req,res) => {
    const {phone} = req.body;
    SendOTP(phone);
    res.json({messages: "OTP Sent"})
})

app.post("/verify-otp",verifyLimiter, (req,res) =>{
    const {phone, otp} = req.body;
    const result = verifyOTP(phone,otp);
    // res.json({message: result ? "OTP Matched" : "Wrong OTP"})

    if(result == "success"){
        res.json({message: "OTP Verified"})
    } else if(result == "blocked"){
        res.json({message: "Too many attempts! request a new OTP"});
    } else if(result == "wrong"){
        res.json({message: `Wrong OTP! attempts ${otpStore[phone].attempts}/3`})
    }else{
        res.json({message:"No OTP Found! request a new one"})
    }

})

app.listen(3000, ()=>{
    console.log("Server running on port: 3000")
})