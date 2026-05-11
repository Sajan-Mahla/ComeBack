const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)

let otpStore = {}

function SendOTP(phoneNumber) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[phoneNumber] = {
    otp: otp,
    attempts: 0
  }
  client.messages.create({
    to: phoneNumber,
    from: process.env.TWILIO_NUMBER,
    body: `Your OTP is: ${otp}`
  })
  console.log(`OTP for ${phoneNumber}: ${otp}`)
}

function verifyOTP(phoneNumber, enteredOTP) {
  if (!otpStore[phoneNumber]) return "no_otp"
  if (otpStore[phoneNumber].attempts >= 3) {
    delete otpStore[phoneNumber]
    return "blocked"
  }
  if (otpStore[phoneNumber].otp == enteredOTP) {
    delete otpStore[phoneNumber]
    return "success"
  } else {
    otpStore[phoneNumber].attempts++
    return "wrong"
  }
}

module.exports = { SendOTP, verifyOTP }