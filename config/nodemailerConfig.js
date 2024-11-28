// config/nodemailerConfig.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter object using SMTP transport for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's service
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,   
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates (if any)
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring transporter:', error);
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});

module.exports = transporter;


// // config/nodemailerConfig.js
// require('dotenv').config();
// const nodemailer = require('nodemailer');

// // Create transporter object using SMTP transport for Outlook
// const transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com', // Outlook SMTP server
//   port: process.env.EMAIL_PORT || 587, // Port for TLS
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER, //  Outlook email address
//     pass: process.env.EMAIL_PASS, //  Outlook App Password
//   },
//   tls: {
//     ciphers: 'SSLv3', // Ensure TLS settings
//   }
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error configuring transporter:', error);
//   } else {
//     console.log('Nodemailer transporter is ready to send emails');
//   }
// });

// module.exports = transporter;
