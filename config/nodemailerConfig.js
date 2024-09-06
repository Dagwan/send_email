// config/nodemailerConfig.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
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
