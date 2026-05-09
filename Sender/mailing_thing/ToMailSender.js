require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    }
);

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });

    console.log("Email Sent")
}

sendMail("sajancompany64@gmail.com","This is subject","This is message")