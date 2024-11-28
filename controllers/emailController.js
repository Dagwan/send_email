const transporter = require('../config/nodemailerConfig');
const ejs = require('ejs');
const path = require('path');

/**
 * Sends an email using a specified EJS template.
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
    console.log('Invitation Email sent successfully to:', to, 'Response:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Sends personalized emails to multiple recipients.
 */
const sendPersonalizedEmails = async (emails, names, subject, dynamicContent) => {
  try {
    for (let i = 0; i < emails.length; i++) {
      const personalizedContext = {
        name: names[i],
        ...dynamicContent  // Spread dynamic content for flexibility
      };

      await sendEmail(emails[i], subject, 'londonSchool.ejs', personalizedContext);
    }
  } catch (error) {
    console.error('Error sending personalized emails:', error);
    throw new Error(`Failed to send personalized emails: ${error.message}`);
  }
};

/**
 * Sends a single dynamic content email.
 */
const sendDynamicEmail = async (to, subject, dynamicContent) => {
  try {
    const templatePath = path.join(__dirname, '../views/emailTemplates/londonSchool.ejs');
    const html = await ejs.renderFile(templatePath, dynamicContent);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Dynamic email sent successfully to:', to, 'Response:', info.response);
  } catch (error) {
    console.error('Error sending dynamic email:', error);
    throw new Error(`Failed to send dynamic email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
  sendPersonalizedEmails,
  sendDynamicEmail
};