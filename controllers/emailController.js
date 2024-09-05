const transporter = require('../config/nodemailerConfig');
const ejs = require('ejs');
const path = require('path');

/**
 * Sends an email using a specified EJS template.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Subject of the email.
 * @param {string} templateName - Name of the EJS template file.
 * @param {Object} context - Context object to populate the template.
 * @param {Array} [attachments=[]] - Optional array of attachment objects for including images or files.
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, templateName, context, attachments = []) => {
  try {
    // Define the path to the EJS template file
    const templatePath = path.join(__dirname, '../views/emailTemplates', templateName);

    // Render the EJS template with the provided context
    const html = await ejs.renderFile(templatePath, context);

    // Define mail options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to, // Recipient email address
      subject, // Subject of the email
      html, // HTML content of the email
      attachments // Array of attachments
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendEmail
};
