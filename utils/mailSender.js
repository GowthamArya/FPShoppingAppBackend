const nodemailer = require('nodemailer');
require("dotenv").config();
const mailSender = async (email,title,body) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info = await transporter.sendMail({
            from: {
                name:"Farmer's Palm",
                address:"gowtham@gmail.com",
            },
            to: `${email}`,
            subject: `${title}`,
            html:`${body}`,
        })
        // return info;'Arya'
    } catch (e) {
        console.error(e);
    }
}

module.exports = mailSender;