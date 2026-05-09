require("dotenv").config();
const twilio = require("twilio");

const client = twilio( process.env.TWILIO_NUMBER, process.env.TWILIO_AUTH);

function SendSms(to, message){
    client.messages.create({
        to:to,
        from:process.env.TWILIO_NUMBER,
        body: message
    });
    console.log("SMS Sent");
}

SendSms("+917973441373","You're mobile has been hacked 💀")