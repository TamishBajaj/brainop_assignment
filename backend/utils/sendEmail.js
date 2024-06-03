// const nodeMailer=require('nodemailer')

// const sendEmail=async(options)=>{
//     let transporter = nodeMailer.createTransport({
//         host:process.env.SMPT_HOST,
//         port:process.env.SMPT_PORT,
//         service: process.env.SMPT_SERVICE,
//         auth: {
//             user: process.env.SMPT_MAIL, 
//             pass: process.env.SMPT_PASSWORD, 
//             }
//             });
    
//     const mailOptions={
//         from:process.env.SMPT_MAIL,
//         to:options.email,
//         subject:options.subject,
//         text:options.message,
//     }  
//     await transporter.sendMail(mailOptions)      
// }

// module.exports=sendEmail


const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = { sendEmail };
