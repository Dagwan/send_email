const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'London Graduate School Email Service API',
    description: `API documentation for the London Graduate School Email Service. This API allows you to send emails using EJS templates and handle optional attachments.`
  },
  host: process.env.NODE_ENV === 'production' ? process.env.HOSTS : process.env.HOST,
  schemes: [process.env.NODE_ENV === 'production' ? 'https' : process.env.SCHEMES || 'http'],
  definitions: {
    EmailRequest: {
      type: 'object',
      properties: {
        email: { type: 'array', items: { type: 'string', format: 'email' }, description: 'List of recipient email addresses.' },
        name: { type: 'array', items: { type: 'string' }, description: 'List of recipient names.' },
        subject: { type: 'string', description: 'Subject of the email.' },
        dynamicContent: {
          type: 'object',
          properties: {
            subjectHeading: { type: 'string' },
            introParagraph: { type: 'string' },
          }
        }
      },
      required: ['email', 'name', 'subject', 'dynamicContent']
    }
  },
  paths: {
    '/send-invitation-email': {
      post: {
        tags: ['Email Service'],
        summary: 'Send an invitation email',
        description: 'Sends an invitation email using dynamic content (e.g., headings, paragraphs, key topics) and optional attachments.',
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
          200: { description: 'Invitation email sent successfully' },
          400: { description: 'Invalid input' },
          500: { description: 'Server error' }
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/emailRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
console.log('Swagger documentation generated successfully');
