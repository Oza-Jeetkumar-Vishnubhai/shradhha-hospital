const { json } = require("body-parser");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email,message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
    message = message.map(ele=>{return JSON.stringify(ele)})
  console.log("my",message)
  let transporter = nodemailer.createTransport({
    host: "onlyjeet31@gmail.com",
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "onlyjeet31@gmail.com", // generated ethereal user
      pass: "onlyjeet31*", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'onlyjeet31@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Medicine Bill", // Subject line
    text: "😁😁😁" // plain text body
    // html: 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendMail
