// controllers/emailController.js
const transporter = require('../config/nodemailerConfig');
const ejs = require('ejs');
const path = require('path');

/**
 * Sends an email using a specified EJS template.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Subject of the email.
 * @param {string} templateName - Name of the EJS template file.
 * @param {Object} context - Context object to populate the template (e.g., name, links, etc.).
 * @param {Array} [attachments=[]] - Optional array of attachment objects for including images or files.
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, templateName, context, attachments = []) => {
  try {
    // Path to the EJS template
    const templatePath = path.join(__dirname, '../views/emailTemplates', templateName);

    // Check if the template file exists
    if (!path.extname(templatePath)) {
      throw new Error(`Template name must include file extension, e.g., 'welcome.ejs'`);
    }

    // Render the HTML content with the EJS template and context
    const html = await ejs.renderFile(templatePath, context);

    // Define email options, including recipients, subject, content, and attachments
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments: attachments || [] // Ensure attachments is always an array
    };

    // Log mailOptions for debugging
    console.log('Mail Options:', mailOptions);

    // Send the email using nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  sendEmail
};

