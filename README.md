#  London Graduate School Email System

The London Graduate School Email System is an email-sending application built using Node.js, Express.js, and Nodemailer. It allows users to send personalized emails with custom templates and attachments, making it an ideal tool for automating communication with clients, customers, or users. The system supports sending templated emails, such as welcome messages, newsletters, and notifications, and allows attachments like images or files to be included in the emails.

---------------------------------------------------------------------------------------------------------------------------------

## Overview

This email system is designed to enhance the communication infrastructure at London Graduate School by automating email processes. Key features include:

- **Custom Templates:** Emails can be sent using dynamic EJS templates, allowing for personalized content based on the user's name, email, or other information.
- **Attachments:** The system allows for file attachments, such as images or documents, to be included in emails.
- **Automated Sending:** Emails can be triggered based on specific actions or events, making it easier to manage customer interactions.

---------------------------------------------------------------------------------------------------------------------------------

## API Documentation
To explore the API and test the endpoints, you can use Swagger UI, which provides an interactive documentation interface. Access the Swagger UI at:
[API Documentation](https://send-email-517z.onrender.com/send-invitation-email/api-docs). 

You can find information on how to test the  swagger UI in the routes.rest.

---------------------------------------------------------------------------------------------------------------------------------

## Features

- **Email Sending:** Send emails to users with customizable content, templates, and file attachments.
- **EJS Templating:** Use EJS to create dynamic email templates with placeholders for user data (e.g., name, email).
- **File Attachments:** Attach files to emails, such as images or PDFs, using Nodemailer.
- **Error Handling:** The system includes error logging and graceful handling for failed email attempts.

---------------------------------------------------------------------------------------------------------------------------------

## Project Structure
- **Email Templates:** All email templates are stored in the views/emailTemplates directory, created using EJS templating.
- **Controllers:** Logic for sending emails is handled in the controllers/emailController.js file.
- **Routes:** Email-related API routes are defined in the routes/emailRoutes.js file, which includes an endpoint for sending emails.

---------------------------------------------------------------------------------------------------------------------------------

## Installation
To install the necessary dependencies, run the following command:
`npm install`

---------------------------------------------------------------------------------------------------------------------------------

## Usage
1. **Start the Server:** Start the server locally using the following command:
`npm start`

2. **Send Email:** To send an email, make a POST request to the /api/email/send-email endpoint with the following JSON payload:
`{`
  `"email": "recipient@example.com",`
  `"name": "John Doe",`
  `"template": "welcome.ejs",`
  `"attachments": [`
    `{`
      `"filename": "image.png",`
      `"path": "path/to/image.png",`
      `"cid": "unique@image.cid"`
    `}`
  `]`
`}`
3. **Local Testing:** Replace any environment URLs with http://localhost:8080 for local testing.


---------------------------------------------------------------------------------------------------------------------------------

## Development Environment

- **Node.js:** A JavaScript runtime environment for building server-side applications.
- **Express.js:** A web application framework for Node.js that provides a robust set of features for web and mobile applications.
- **Nodemailer:** A module for sending emails using Node.js.
- **EJS:** A simple templating language used to create dynamic email templates.


---------------------------------------------------------------------------------------------------------------------------------

## Error Handling
In case of an error during email sending, the application logs the issue and returns an appropriate error message. For example, missing attachments or incorrect file paths will generate an error, which is logged for debugging purposes.

---------------------------------------------------------------------------------------------------------------------------------

## Useful Websites

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [EJS Documentation](https://ejs.co/)

---------------------------------------------------------------------------------------------------------------------------------

## Future Work

Planned improvements for the email system include:

- * Allow scheduling emails for specific times.
- * Implement functionality to send emails to multiple recipients at once.
- * Add a feature to preview email templates before sending.
- * Improve error messages and logging for better debugging.

---------------------------------------------------------------------------------------------------------------------------------

## License

This project is licensed under the MIT License - see the [LICENSE](/docs/LICENSE) file for details.