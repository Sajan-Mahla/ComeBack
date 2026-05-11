// require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS
}
    }
);

console.log("MAIL_USER:", process.env.GMAIL_USER)
console.log("MAIL_PASS:", process.env.GMAIL_PASS)
async function sendMail(to,sub,msg){
    await transporter.sendMail({
        to,
        subject: sub,
        html: msg
    })
    console.log("Email Sent")
}
module.exports = sendMail;