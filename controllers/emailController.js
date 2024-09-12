const transporter = require('../config/nodemailerConfig');
const ejs = require('ejs');
const path = require('path');

/**
 * Sends an email using a specified EJS template.
 * @param {string[]} to - Array of recipient email addresses.
 * @param {string} subject - Subject of the email.
 * @param {string} templateName - Name of the EJS template file.
 * @param {Object} context - Context object to populate the template (e.g., name, links, etc.).
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, templateName, context) => {
  try {
    const templatePath = path.join(__dirname, '../views/emailTemplates', templateName);
    const html = await ejs.renderFile(templatePath, context);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

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








// const transporter = require('../config/nodemailerConfig');
// const ejs = require('ejs');
// const path = require('path');

// /**
//  * Sends an email using a specified EJS template.
//  * @param {string[]} to - Array of recipient email addresses.
//  * @param {string} subject - Subject of the email.
//  * @param {string} templateName - Name of the EJS template file.
//  * @param {Object} context - Context object to populate the template (e.g., name, links, etc.).
//  * @param {Array} [attachments=[]] - Optional array of attachment objects for including files.
//  * @param {Array} [imageUrls=[]] - Array of image URLs to include in the email.
//  * @returns {Promise<void>}
//  */
// const sendEmail = async (to, subject, templateName, context, attachments = [], imageUrls = []) => {
//   try {
//     // Path to the EJS template
//     const templatePath = path.join(__dirname, '../views/emailTemplates', templateName);

//     // Render the HTML content with the EJS template and context
//     const html = await ejs.renderFile(templatePath, context);

//     // Define email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//       attachments: attachments.map((attachment) => ({
//         filename: attachment.filename,
//         content: attachment.content,
//         contentDisposition: attachment.embed ? 'inline' : 'attachment'
//       }))
//     };

//     // Send the email using nodemailer
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully:', info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error(`Failed to send email: ${error.message}`);
//   }
// };

// module.exports = {
//   sendEmail
// };