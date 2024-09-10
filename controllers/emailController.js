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

    // Render the HTML content with the EJS template and context
    const html = await ejs.renderFile(templatePath, context);

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments: attachments.map(att => ({
        filename: att.filename,
        path: att.path,
        cid: att.embed ? att.cid : undefined // Only embed images if 'embed' is true
      }))
    };

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




// const transporter = require('../config/nodemailerConfig');
// const ejs = require('ejs');
// const path = require('path');

// /**
//  * Sends an email using a specified EJS template.
//  * @param {string | Array} to - Recipient email address(es), accepts a single email or an array of emails.
//  * @param {string} subject - Subject of the email.
//  * @param {string} templateName - Name of the EJS template file.
//  * @param {Object} context - Context object to populate the template (e.g., name, links, body, etc.).
//  * @param {Array} [attachments=[]] - Optional array of attachment objects for including images or files.
//  * @returns {Promise<void>}
//  */
// const sendEmail = async (to, subject, templateName, context, attachments = []) => {
//   try {
//     // Ensure `links` is defined in the context
//     context.links = context.links || []; 

//     // Path to the EJS template
//     const templatePath = path.join(__dirname, '../views/emailTemplates', templateName);

//     // Render the HTML content with the EJS template and context
//     const html = await ejs.renderFile(templatePath, { ...context, attachments });

//     // Prepare email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: Array.isArray(to) ? to.join(', ') : to,
//       subject,
//       html,
//       attachments: attachments.map((att) => ({
//         filename: att.filename,
//         path: att.path,
//         cid: att.embed ? att.cid : undefined, // Embed if 'embed' is true
//       })),
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
