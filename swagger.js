const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'Fakad Infotech Centre Email Service API',
    description: `API documentation for the Fakad Infotech Centre Email Service. This API allows you to send emails using EJS templates and handle optional attachments. It supports sending various types of emails, such as welcome emails, and provides functionality for adding attachments if needed.

**Key Features:**

- **Send Welcome Email:** Use the POST endpoint to send a welcome email to a recipient. This endpoint supports sending emails with a predefined template ('welcome.ejs') and allows for optional attachments.

**Sample Requests and Responses:** Detailed sample JSON requests and responses are provided for each endpoint to illustrate how to use the API effectively.

**Error Handling:** The API includes error responses and status codes to assist you in case of any issues.

**API Documentation:** Explore the detailed API documentation below to learn how to use each endpoint, the expected request structures, and response formats.

Integrate this email service API into your applications to enhance communication with your users by sending personalized and well-formatted emails.`,
  },
  
   // Production
   host: 'https://send-email-517z.onrender.com',
   schemes: ['https'],
   
  // Development
  host: process.env.HOST || 'localhost:3000',
  schemes: [process.env.SCHEMES || 'http'],

  definitions: {
    EmailRequest: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', description: 'Recipient email address.' },
        name: { type: 'string', description: 'Name of the recipient.' },
        link: { type: 'string', format: 'uri', description: 'Link to include in the email.' },
        attachments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              filename: { type: 'string', description: 'Name of the file.' },
              contentType: { type: 'string', description: 'MIME type of the file.' },
              content: { type: 'string', description: 'Base64 encoded content of the file.' }
            }
          },
          description: 'Optional attachments to include in the email.'
        }
      },
      required: ['email', 'name', 'link']
    }
  },
  paths: {
    '/send-welcome-email': {
      post: {
        tags: ['Email Service'],
        summary: 'Send a welcome email',
        description: 'Sends a welcome email using the `welcome.ejs` template with optional attachments.',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/EmailRequest'
            }
          }
        ],
        responses: {
          200: {
            description: 'Welcome email sent successfully',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  example: 'Welcome email sent successfully.'
                }
              }
            }
          },
          400: {
            description: 'Invalid input'
          },
          500: {
            description: 'Server error'
          }
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/emailRoutes.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
console.log('Swagger documentation generated successfully');
