const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const environment = process.env.NODE_ENV || '';

// Determine the host and scheme based on the environment
const isProduction = environment === 'production';
const host = isProduction ? process.env.PROD_HOST : process.env.DEV_HOST;
const schemes = [isProduction ? 'https' : 'http']; // Set to https in production

const doc = {
  info: {
    title: 'London Graduate School Email Service API',
    description: `API documentation for the London Graduate School Email Service. This API allows you to send emails using EJS templates and handle optional attachments. It supports sending various types of emails, such as invitation emails, and provides functionality for adding attachments if needed.
    **Key Features:**

- **Send Invitation Email:** Use the POST endpoint to send invitation emails with dynamic content like headings, paragraphs, and lists of topics. It allows for multiple recipients, attachments, and includes links to external content.
- **Send Welcome Email:** Use the POST endpoint to send a welcome email to a recipient. This endpoint supports sending emails with a predefined template ('welcome.ejs') and allows for optional attachments.

**Sample Requests and Responses:** Detailed sample JSON requests and responses are provided for each endpoint to illustrate how to use the API effectively.

**Error Handling:** The API includes error responses and status codes to assist you in case of any issues.

**API Documentation:** Explore the detailed API documentation below to learn how to use each endpoint, the expected request structures, and response formats.

Integrate this email service API into your applications to enhance communication with your users by sending personalized and well-formatted emails.`,
  },
  host,
  schemes, // Now it will use http for development and https for production
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
            firstImage: { type: 'string', format: 'uri' },
            aboutHeading: { type: 'string' },
            aboutParagraph: { type: 'string' },
            secondImage: { type: 'string', format: 'uri' },
            invitationHeading: { type: 'string' },
            invitationParagraph: { type: 'string' },
            detailsHeading: { type: 'string' },
            detailsList: { type: 'array', items: { type: 'string' } },
            keyTopicsHeading: { type: 'string' },
            keyTopicsList: { type: 'array', items: { type: 'string' } },
            keyTopicsImage: { type: 'string', format: 'uri' },
            masterClassHeading: { type: 'string' },
            masterClassParagraph: { type: 'string' },
            weAreInHeading: { type: 'string' },
            weAreInParagraph: { type: 'string' },
            nominationHeading: { type: 'string' },
            nominationParagraph: { type: 'string' },
            otherCostsHeading: { type: 'string' },
            otherCostsList: { type: 'array', items: { type: 'string' } },
            paymentInfoHeading: { type: 'string' },
            paymentInfoParagraph: { type: 'string' },
            paymentDetails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  bankName: { type: 'string' },
                  intermediaryBank: { type: 'string' },
                  swiftCode: { type: 'string' },
                  routingNumber: { type: 'string' },
                  beneficiaryName: { type: 'string' },
                  beneficiaryAccount: { type: 'string' }
                }
              }
            },
            thirdPartyPaymentInfo: { type: 'string' },
            distanceLearningInfo: { type: 'string' },
            endowmentInfo: { type: 'string' },
            enrolNowInfo: { type: 'string' },
            closingLine: { type: 'string' },
            signatureImage: { type: 'string', format: 'uri' },
            SignName: { type: 'string' },
            letterheadImage: { type: 'string', format: 'uri' },
            footerText: { type: 'string' },
            footerImage: { type: 'string', format: 'uri' },
            viewInBrowserLink: { type: 'string', format: 'uri' },
            unsubscribeLink: { type: 'string', format: 'uri' }
          }
        },
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
          200: {
            description: 'Invitation email sent successfully',
          },
          400: { description: 'Invalid input' },
          500: { description: 'Server error' }
        }
      }
    },
    '/send-welcome-email': {
      post: {
        tags: ['Email Service'],
        summary: 'Send a welcome email',
        description: 'Sends a welcome email using the `londonSchool.ejs` template with optional attachments.',
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
          200: { description: 'London Graduate School email sent successfully' },
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
console.log('Swagger runs successfully');



// const swaggerAutogen = require('swagger-autogen')();
// require('dotenv').config();

// const isProduction = process.env.NODE_ENV === 'production';

// const doc = {
//   info: {
//     title: 'London Graduate School Email Service API',
//     description: `API documentation for the London Graduate School Email Service. This API allows you to send emails using EJS templates and handle optional attachments. It supports sending various types of emails, such as invitation emails, and provides functionality for adding attachments if needed.

// **Key Features:**

// - **Send Invitation Email:** Use the POST endpoint to send invitation emails with dynamic content like headings, paragraphs, and lists of topics. It allows for multiple recipients, attachments, and includes links to external content.
// - **Send Welcome Email:** Use the POST endpoint to send a welcome email to a recipient. This endpoint supports sending emails with a predefined template ('welcome.ejs') and allows for optional attachments.

// **Sample Requests and Responses:** Detailed sample JSON requests and responses are provided for each endpoint to illustrate how to use the API effectively.

// **Error Handling:** The API includes error responses and status codes to assist you in case of any issues.

// **API Documentation:** Explore the detailed API documentation below to learn how to use each endpoint, the expected request structures, and response formats.

// Integrate this email service API into your applications to enhance communication with your users by sending personalized and well-formatted emails.`,
//   },
  
//   host: isProduction ? 'send-email-517z.onrender.com' : process.env.HOST || 'localhost:8080',
//   schemes: [isProduction ? 'https' : (process.env.SCHEMES || 'http')],

//   // // Production
//   // hosts: 'https://send-email-517z.onrender.com/',
//   // schemes: [process.env.SCHEMES || 'https'],
   
//   // // Development
//   // host: process.env.HOST || 'localhost:8080',
//   // schemes: [process.env.SCHEMES || 'http'],

//   definitions: {
//     EmailRequest: {
//       type: 'object',
//       properties: {
//         email: { type: 'array', items: { type: 'string', format: 'email' }, description: 'List of recipient email addresses.' },
//         name: { type: 'array', items: { type: 'string' }, description: 'List of recipient names.' },
//         subject: { type: 'string', description: 'Subject of the email.' },
//         dynamicContent: {
//           type: 'object',
//           properties: {
//             subjectHeading: { type: 'string' },
//             introParagraph: { type: 'string' },
//             firstImage: { type: 'string', format: 'uri' },
//             aboutHeading: { type: 'string' },
//             aboutParagraph: { type: 'string' },
//             secondImage: { type: 'string', format: 'uri' },
//             invitationHeading: { type: 'string' },
//             invitationParagraph: { type: 'string' },
//             detailsHeading: { type: 'string' },
//             detailsList: { type: 'array', items: { type: 'string' } },
//             keyTopicsHeading: { type: 'string' },
//             keyTopicsList: { type: 'array', items: { type: 'string' } },
//             keyTopicsImage: { type: 'string', format: 'uri' },
//             masterClassHeading: { type: 'string' },
//             masterClassParagraph: { type: 'string' },
//             weAreInHeading: { type: 'string' },
//             weAreInParagraph: { type: 'string' },
//             nominationHeading: { type: 'string' },
//             nominationParagraph: { type: 'string' },
//             otherCostsHeading: { type: 'string' },
//             otherCostsList: { type: 'array', items: { type: 'string' } },
//             paymentInfoHeading: { type: 'string' },
//             paymentInfoParagraph: { type: 'string' },
//             paymentDetails: {
//               type: 'array',
//               items: {
//                 type: 'object',
//                 properties: {
//                   type: { type: 'string' },
//                   bankName: { type: 'string' },
//                   intermediaryBank: { type: 'string' },
//                   swiftCode: { type: 'string' },
//                   routingNumber: { type: 'string' },
//                   beneficiaryName: { type: 'string' },
//                   beneficiaryAccount: { type: 'string' }
//                 }
//               }
//             },
//             thirdPartyPaymentInfo: { type: 'string' },
//             distanceLearningInfo: { type: 'string' },
//             endowmentInfo: { type: 'string' },
//             enrolNowInfo: { type: 'string' },
//             closingLine: { type: 'string' },
//             signatureImage: { type: 'string', format: 'uri' },
//             SignName: { type: 'string' },
//             letterheadImage: { type: 'string', format: 'uri' },
//             footerText: { type: 'string' },
//             footerImage: { type: 'string', format: 'uri' },
//             viewInBrowserLink: { type: 'string', format: 'uri' },
//             unsubscribeLink: { type: 'string', format: 'uri' }
//           }
//         },
//         attachments: {
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               filename: { type: 'string', description: 'Name of the file.' },
//               contentType: { type: 'string', description: 'MIME type of the file.' },
//               content: { type: 'string', description: 'Base64 encoded content of the file.' }
//             }
//           },
//           description: 'Optional attachments to include in the email.'
//         }
//       },
//       required: ['email', 'name', 'subject', 'dynamicContent']
//     }
//   },

//   paths: {
//     '/send-invitation-email': {
//       post: {
//         tags: ['Email Service'],
//         summary: 'Send an invitation email',
//         description: 'Sends an invitation email using dynamic content (e.g., headings, paragraphs, key topics) and optional attachments.',
//         parameters: [
//           {
//             in: 'body',
//             name: 'body',
//             required: true,
//             schema: {
//               $ref: '#/definitions/EmailRequest'
//             }
//           }
//         ],
//         responses: {
//           200: {
//             description: 'Invitation email sent successfully',
//             content: {
//               'text/html': {
//                 schema: {
//                   type: 'string',
//                   example: 'Invitation email sent successfully.'
//                 }
//               }
//             }
//           },
//           400: {
//             description: 'Invalid input'
//           },
//           500: {
//             description: 'Server error'
//           }
//         }
//       }
//     },
//     '/send-welcome-email': {
//       post: {
//         tags: ['Email Service'],
//         summary: 'Send a welcome email',
//         description: 'Sends a welcome email using the `londonSchool.ejs` template with optional attachments.',
//         parameters: [
//           {
//             in: 'body',
//             name: 'body',
//             required: true,
//             schema: {
//               $ref: '#/definitions/EmailRequest'
//             }
//           }
//         ],
//         responses: {
//           200: {
//             description: 'London Graduate School email sent successfully',
//             content: {
//               'text/html': {
//                 schema: {
//                   type: 'string',
//                   example: 'London Graduate School email sent successfully.'
//                 }
//               }
//             }
//           },
//           400: {
//             description: 'Invalid input'
//           },
//           500: {
//             description: 'Server error'
//           }
//         }
//       }
//     }
//   }
// };

// const outputFile = './swagger.json';
// const endpointsFiles = ['./routes/emailRoutes.js'];

// // Generate swagger.json
// swaggerAutogen(outputFile, endpointsFiles, doc);
// console.log('Swagger documentation generated successfully');
