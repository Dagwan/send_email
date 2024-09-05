const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'Fakad Infotech Centre Management API',
    description: `API documentation for the Fakad Management API. This API is designed to help you manage student applications, contact messages, and user accounts efficiently. Whether you need to create, retrieve, update, or delete records, this API has got you covered. With a user-friendly interface and comprehensive functionality, you can seamlessly integrate these management tasks into your applications.

**Key Features:**

- **Create Student Applications:** Use the POST endpoint to add new student applications to your database, providing details like name, contact information, guardian details, and choice of training programme.

- **Retrieve Student Applications:** The GET endpoint allows you to fetch a list of all student applications or retrieve a specific application by its unique ID.

- **Update Student Applications:** Easily update student application information using the PUT endpoint. Send the updated details in JSON format to modify existing applications.

- **Delete Student Applications:** Remove student applications from your database using the DELETE endpoint. Specify the application's ID to delete a specific entry.

- **Create Contact Messages:** Use the POST endpoint to add new contact messages to your database, providing details like name, email, phone, subject, and message.

- **Retrieve Contact Messages:** The GET endpoint allows you to fetch a list of all contact messages or retrieve a specific message by its unique ID.

- **Update Contact Messages:** Easily update contact message information using the PUT endpoint. Send the updated details in JSON format to modify existing messages.

- **Delete Contact Messages:** Remove contact messages from your database using the DELETE endpoint. Specify the message's ID to delete a specific entry.

- **Create User Accounts:** Use the POST endpoint to add new user accounts to your database, providing details like full name, username, password, email, phone number, date of birth, and gender.

- **Retrieve User Accounts:** The GET endpoint allows you to fetch a list of all user accounts or retrieve a specific account by its unique ID.

- **Update User Accounts:** Easily update user account information using the PUT endpoint. Send the updated details in JSON format to modify existing accounts.

- **Delete User Accounts:** Remove user accounts from your database using the DELETE endpoint. Specify the account's ID to delete a specific entry.

**Sample Requests and Responses:** We've provided sample JSON requests and responses for each endpoint to help you understand how to interact with the API effectively.

**Error Handling:** The API includes error responses and status codes to guide you in case of any issues.

**API Documentation:** Explore the detailed API documentation below to learn how to use each endpoint, the expected request structures, and response formats.

Start managing your student applications, contact messages, and user accounts effortlessly with the Fakad Infotech Centre Management API. Integrate it into your applications to streamline these management tasks and enhance user experiences.


# DEVELOPER'S GUIDE/INSTRUCTIONS ON HOW TO PERFORM THE CRUD
-----------------------------------------------------------------
For local testing, replace the base URL "https://fakad-student-application.onrender.com/application-form" with http://localhost:8080/application-form.

For example, the endpoint "https://fakad-student-application.onrender.com/application-form" should be accessed as "http://localhost:8080/application-form" when testing locally. Everything else in the API request remains the same.

-----------------------------------------------------------------

## Application form
### // PRODUCTION

#### create fakads
curl -X POST https://fakad-student-application.onrender.com/application-form/
-H "Content-Type: application/json" \
-d '{
  "firstName": "Hope",
  "middleName": "A",
  "lastName": "Simon",
  "gender": "Female",
  "dateOfBirth": "1990-05-15",
  "maritalStatus": "Single",
  "phoneNumber": "+1234567890",
  "email": "hope.simon@example.com",
  "contactAddress": "123 Tech Street",
  "occupation": "Software Engineer",
  "placeOfBirth": "Tech City",
  "stateOfOrigin": "Tech State",
  "localGovtArea": "Tech Local Govt",
  "homeTown": "Tech Town",
  "villageAddress": "Tech Village",
  "previousTraining": "Yes",
  "previousTrainingDetails": {
    "trainingPlaceName": "Tech Training Center",
    "trainingAddress": "456 Training Avenue",
    "trainingDuration": "6 months"
  },
  "choiceOfTrainingProgramme": "Certificate",
  "passportPhotograph": "base64ImageString",
  "guardian": {
    "firstName": "GuardianFirstName",
    "middleName": "GuardianMiddleName",
    "lastName": "GuardianLastName",
    "gender": "Male",
    "maritalStatus": "Married",
    "phoneNumber": "+9876543210",
    "email": "guardian@example.com",
    "contactAddress": "789 Guardian Street",
    "occupation": "Guardian Occupation",
    "placeOfBirth": "Guardian City",
    "stateOfOrigin": "Guardian State",
    "localGovtArea": "Guardian Local Govt",
    "homeTown": "Guardian Town",
    "villageAddress": "Guardian Village",
    "identificationType": "National ID",
    "identificationUpload": "base64ImageString",
    "passportPhotograph": "guardianBase64ImageString"
  },
  "nextOfKin": {
    "firstName": "NextOfKinFirstName",
    "middleName": "NextOfKinMiddleName",
    "lastName": "NextOfKinLastName",
    "gender": "Female",
    "maritalStatus": "Single",
    "relationship": "Mother",
    "phoneNumber": "+9876543210",
    "email": "nextofkin@example.com",
    "contactAddress": "789 NextOfKin Street",
    "occupation": "NextOfKin Occupation",
    "placeOfBirth": "NextOfKin City",
    "stateOfOrigin": "NextOfKin State",
    "localGovtArea": "NextOfKin Local Govt",
    "homeTown": "NextOfKin Town",
    "villageAddress": "NextOfKin Village"
  }
}'

### Get all fakads
GET https://fakad-student-application.onrender.com/application-form/


### Get a fakad by ID
GET https://fakad-student-application.onrender.com/application-form/66a4d0a8b662e5bd9f890aa8
// Replace :id with the actual ID of the fakad


### Update a fakad
curl -X PUT https://fakad-student-application.onrender.com/application-form/66a4d0a8b662e5bd9f890aa8 \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "middleName": "B",
  "lastName": "Doe",
  "gender": "Male",
  "dateOfBirth": "1995-08-20",
  "maritalStatus": "Married",
  "phoneNumber": "+9876543210",
  "email": "johndoe@example.com",
  "contactAddress": "456 Data Avenue",
  "occupation": "Data Scientist",
  "placeOfBirth": "Data City",
  "stateOfOrigin": "Data State",
  "localGovtArea": "Data Local Govt",
  "homeTown": "Data Town",
  "villageAddress": "Data Village",
  "previousTraining": "No",
  "choiceOfTrainingProgramme": "Diploma",
  "passportPhotograph": "newBase64ImageString",
  "guardian": {
    "firstName": "UpdatedGuardianFirstName",
    "middleName": "",
    "lastName": "UpdatedGuardianLastName",
    "gender": "Female",
    "maritalStatus": "Divorced",
    "phoneNumber": "+9876543210",
    "email": "updatedguardian@example.com",
    "contactAddress": "789 Updated Guardian Street",
    "occupation": "Updated Guardian Occupation",
    "placeOfBirth": "Updated Guardian City",
    "stateOfOrigin": "Updated Guardian State",
    "localGovtArea": "Updated Guardian Local Govt",
    "homeTown": "Updated Guardian Town",
    "villageAddress": "Updated Guardian Village",
    "identificationType": "International Passport",
    "identificationUpload": "updatedBase64ImageString",
    "passportPhotograph": "updatedGuardianBase64ImageString"
  },
  "nextOfKin": {
    "firstName": "UpdatedNextOfKinFirstName",
    "middleName": "",
    "lastName": "UpdatedNextOfKinLastName",
    "gender": "Male",
    "maritalStatus": "Married",
    "relationship": "Father",
    "phoneNumber": "+9876543210",
    "email": "updatednextofkin@example.com",
    "contactAddress": "789 Updated NextOfKin Street",
    "occupation": "Updated NextOfKin Occupation",
    "placeOfBirth": "Updated NextOfKin City",
    "stateOfOrigin": "Updated NextOfKin State",
    "localGovtArea": "Updated NextOfKin Local Govt",
    "homeTown": "Updated NextOfKin Town",
    "villageAddress": "Updated NextOfKin Village"
  }
}'


### Delete a fakad by ID
DELETE https://fakad-student-application.onrender.com/application-form/66b355dc20e5e94c404ff3e9


-----------------------------------------------------------------


### Contact us 
## // PRODUCTION

### Create a contact message
curl -X POST https://fakad-student-application.onrender.com/application-form/contact-us/ \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry about services",
  "message": "I would like to know more about your training programs."
}'

### Get all contact messages
GET https://fakad-student-application.onrender.com/application-form/contact-us/

### Get a contact message by ID
GET https://fakad-student-application.onrender.com/application-form/contact-us/668927861ce7bfba1f64ab5e
// Replace :id with the actual ID of the contact message

### Update a contact message
curl -X PUT https://fakad-student-application.onrender.com/application-form/contact-us/668927861ce7bfba1f64ab5e \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "phone": "+0987654321",
  "subject": "Updated inquiry",
  "message": "I have more questions about your training programs."
}'


### Delete a contact message by ID
DELETE https://fakad-student-application.onrender.com/application-form/contact-us/1234567890abcdef12345678


-----------------------------------------------------------------
### Create Account
## PRODUCTION

### Create an account message
curl -X POST https://fakad-student-application.onrender.com/application-form/create-account/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer 7830b3752ea8ea01538d3123c7c512fd7fa26dbeb49c5b5030d30926f4f6e20d" \
-d '{
  "fullName": "Jane John",
  "username": "john",
  "password": "newpassword123",
  "confirmPassword": "newpassword123",
  "email": "janedoe@example.com",
  "phone": "+0987654321",
  "dob": "1992-02-02",
  "gender": "Female",
  "terms": true,
  "privacy": true
}'


### Login 
curl -X POST https://fakad-student-application.onrender.com/application-form/create-account/login \
-H "Content-Type: application/json" \
-d '{
  "username": "dagwan",
  "password": "dagwanpan0810"
}'

### Forgot Password
curl -X POST https://fakad-student-application.onrender.com/application-form/create-account/forgot-password \
-H "Content-Type: application/json" \
-d '{
  "email": "dagwanpan@gmail.com"
}'

### Reset Password
curl -X POST https://fakad-student-application.onrender.com/application-form/create-account/reset-password/e85683ee38bf459b089ff4b028bc7836e3ff729853896ab7c351c5383c7bbb60 \
-H "Content-Type: application/json" \
-d '{
  "password": "dagwanpan0810",
  "confirmPassword": "dagwanpan0810"
}'

### Get all user accounts
curl -X GET https://fakad-student-application.onrender.com/application-form/create-account/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2NjlmZTY0MDA2YWFmNDAxOTExNDJiMTQiLCJ1c2VybmFtZSI6ImRhZ3dhbiIsImlhdCI6MTcyMTc1NTIwMCwiZXhwIjoxNzIxNzU4ODAwfQ.7lhXzvfOq5gIjghE4lgq0IVjvb0rIADCXOXEgxvXA7A"

### Get a user account by ID
curl -X GET https://fakad-student-application.onrender.com/application-form/create-account/669fe64006aaf40191142b14 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2NjlmZTY0MDA2YWFmNDAxOTExNDJiMTQiLCJ1c2VybmFtZSI6ImRhZ3dhbiIsImlhdCI6MTcyMTc1NTIwMCwiZXhwIjoxNzIxNzU4ODAwfQ.7lhXzvfOq5gIjghE4lgq0IVjvb0rIADCXOXEgxvXA7A"
### Replace :id with the actual ID of the user account

### Update a user account
curl -X PUT https://fakad-student-application.onrender.com/application-form/create-account/669fe64006aaf40191142b14 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2NjlmZTY0MDA2YWFmNDAxOTExNDJiMTQiLCJ1c2VybmFtZSI6ImRhZ3dhbiIsImlhdCI6MTcyMTc1NTIwMCwiZXhwIjoxNzIxNzU4ODAwfQ.7lhXzvfOq5gIjghE4lgq0IVjvb0rIADCXOXEgxvXA7A" \
-d '{
  "fullName": "Jane Doe",
  "username": "janedoe",
  "password": "newpassword123",
  "confirmPassword": "newpassword123",
  "email": "janedoe@example.com",
  "phone": "+0987654321",
  "dob": "1992-02-02",
  "gender": "Female",
  "terms": true,
  "privacy": true
}'
### Replace :id with the actual ID of the user account

### Delete a user account by ID
curl -X DELETE https://fakad-student-application.onrender.com/application-form/create-account/669fe64006aaf40191142b14 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2NjlmZTY0MDA2YWFmNDAxOTExNDJiMTQiLCJ1c2VybmFtZSI6ImRhZ3dhbiIsImlhdCI6MTcyMTc1NTIwMCwiZXhwIjoxNzIxNzU4ODAwfQ.7lhXzvfOq5gIjghE4lgq0IVjvb0rIADCXOXEgxvXA7A"
### Replace :id with the actual ID of the user account`
  },
  // Production
  host: 'fakad-student-application.onrender.com',
  schemes: ['https'],

  // Development
  host: process.env.HOST || 'localhost:8080',
  schemes: [process.env.SCHEMES || 'http'],

  definitions: {
    StudentApplication: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        middleName: { type: 'string' },
        lastName: { type: 'string' },
        gender: { type: 'string' },
        dateOfBirth: { type: 'string', format: 'date' },
        maritalStatus: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: 'string' },
        contactAddress: { type: 'string' },
        occupation: { type: 'string' },
        placeOfBirth: { type: 'string' },
        stateOfOrigin: { type: 'string' },
        localGovtArea: { type: 'string' },
        homeTown: { type: 'string' },
        villageAddress: { type: 'string' },
        previousTraining: { type: 'string' },
        previousTrainingDetails: { type: 'object',
          properties: {
            trainingPlaceName: { type: 'string' },
            trainingAddress: { type: 'string' },
            trainingDuration: { type: 'string' }
          }
        },
        choiceOfTrainingProgramme: { type: 'string' },
        passportPhotograph: { type: 'string' },
        guardian: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            middleName: { type: 'string' },
            lastName: { type: 'string' },
            gender: { type: 'string' },
            maritalStatus: { type: 'string' },
            phoneNumber: { type: 'string' },
            email: { type: 'string' },
            contactAddress: { type: 'string' },
            occupation: { type: 'string' },
            placeOfBirth: { type: 'string' },
            stateOfOrigin: { type: 'string' },
            localGovtArea: { type: 'string' },
            homeTown: { type: 'string' },
            villageAddress: { type: 'string' },
            identificationType: { type: 'string' },
            identificationUpload: { type: 'string' },
            passportPhotograph: { type: 'string' }
          }
        },
        nextOfKin: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            middleName: { type: 'string' },
            lastName: { type: 'string' },
            gender: { type: 'string' },
            maritalStatus: { type: 'string' },
            relationship: { type: 'string' },
            phoneNumber: { type: 'string' },
            email: { type: 'string' },
            contactAddress: { type: 'string' },
            occupation: { type: 'string' },
            placeOfBirth: { type: 'string' },
            stateOfOrigin: { type: 'string' },
            localGovtArea: { type: 'string' },
            homeTown: { type: 'string' },
            villageAddress: { type: 'string' }
          }
        }
      }
    },
    ContactUs: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        subject: { type: 'string' },
        message: { type: 'string' }
      }
    },
    CreateAccount: {
      type: 'object',
      properties: {
        fullName: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        confirmPassword: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        dob: { type: 'string', format: 'date' },
        gender: { type: 'string' },
        terms: { type: 'boolean' },
        privacy: { type: 'boolean' }
      }
    }
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: "Enter your bearer token in the format **Bearer <token>**"
    }
  },
  paths: {
    '/application-form': {
      post: {
        tags: ['Student Applications'],
        summary: 'Create a new student application',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/StudentApplication'
            }
          }
        ],
        responses: {
          200: {
            description: 'Student application created successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      },
      get: {
        tags: ['Student Applications'],
        summary: 'Retrieve all student applications',
        responses: {
          200: {
            description: 'List of student applications',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/StudentApplication'
              }
            }
          },
          400: {
            description: 'Error retrieving student applications'
          }
        }
      }
    },
    '/application-form/{id}': {
      get: {
        tags: ['Student Applications'],
        summary: 'Retrieve a student application by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Student application details',
            schema: {
              $ref: '#/definitions/StudentApplication'
            }
          },
          400: {
            description: 'Error retrieving student application'
          }
        }
      },
      put: {
        tags: ['Student Applications'],
        summary: 'Update a student application by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/StudentApplication'
            }
          }
        ],
        responses: {
          200: {
            description: 'Student application updated successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      },
      delete: {
        tags: ['Student Applications'],
        summary: 'Delete a student application by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Student application deleted successfully'
          },
          400: {
            description: 'Error deleting student application'
          }
        }
      }
    },
    '/contact': {
      post: {
        tags: ['Contact Messages'],
        summary: 'Create a new contact message',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/ContactUs'
            }
          }
        ],
        responses: {
          200: {
            description: 'Contact message created successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      },
      get: {
        tags: ['Contact Messages'],
        summary: 'Retrieve all contact messages',
        responses: {
          200: {
            description: 'List of contact messages',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/ContactUs'
              }
            }
          },
          400: {
            description: 'Error retrieving contact messages'
          }
        }
      }
    },
    '/contact/{id}': {
      get: {
        tags: ['Contact Messages'],
        summary: 'Retrieve a contact message by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Contact message details',
            schema: {
              $ref: '#/definitions/ContactUs'
            }
          },
          400: {
            description: 'Error retrieving contact message'
          }
        }
      },
      put: {
        tags: ['Contact Messages'],
        summary: 'Update a contact message by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/ContactUs'
            }
          }
        ],
        responses: {
          200: {
            description: 'Contact message updated successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      },
      delete: {
        tags: ['Contact Messages'],
        summary: 'Delete a contact message by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Contact message deleted successfully'
          },
          400: {
            description: 'Error deleting contact message'
          }
        }
      }
    },
    '/user': {
      post: {
        tags: ['User Accounts'],
        summary: 'Create a new user account',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateAccount'
            }
          }
        ],
        responses: {
          200: {
            description: 'User account created successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      },
      get: {
        tags: ['User Accounts'],
        summary: 'Retrieve all user accounts',
        responses: {
          200: {
            description: 'List of user accounts',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/CreateAccount'
              }
            }
          },
          400: {
            description: 'Error retrieving user accounts'
          }
        }
      }
    },
    '/user/{id}': {
      get: {
        tags: ['User Accounts'],
        summary: 'Retrieve a user account by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'User account details',
            schema: {
              $ref: '#/definitions/CreateAccount'
            }
          },
          400: {
            description: 'Error retrieving user account'
          }
        }
      },
      put: {
        tags: ['User Accounts'],
        summary: 'Update a user account by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateAccount'
            }
          }
        ],
        responses: {
          200: {
            description: 'User account updated successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      },
      delete: {
        tags: ['User Accounts'],
        summary: 'Delete a user account by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'User account deleted successfully'
          },
          400: {
            description: 'Error deleting user account'
          }
        }
      }
    }
  }
};



const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
console.log('Swagger runs successfully');



// const swaggerAutogen = require('swagger-autogen')();
// require('dotenv').config();

// const doc = {
//   info: {
//     title: 'Fakad Infotech Centre Management API',
//     description: `API documentation for the Fakad Management API. This API is designed to help you manage student applications, contact messages, and user accounts efficiently. Whether you need to create, retrieve, update, or delete records, this API has got you covered. With a user-friendly interface and comprehensive functionality, you can seamlessly integrate these management tasks into your applications.

// **Key Features:**

// - **Create Student Applications:** Use the POST endpoint to add new student applications to your database, providing details like name, contact information, guardian details, and choice of training programme.

// - **Retrieve Student Applications:** The GET endpoint allows you to fetch a list of all student applications or retrieve a specific application by its unique ID.

// - **Update Student Applications:** Easily update student application information using the PUT endpoint. Send the updated details in JSON format to modify existing applications.

// - **Delete Student Applications:** Remove student applications from your database using the DELETE endpoint. Specify the application's ID to delete a specific entry.

// - **Create Contact Messages:** Use the POST endpoint to add new contact messages to your database, providing details like name, email, phone, subject, and message.

// - **Retrieve Contact Messages:** The GET endpoint allows you to fetch a list of all contact messages or retrieve a specific message by its unique ID.

// - **Update Contact Messages:** Easily update contact message information using the PUT endpoint. Send the updated details in JSON format to modify existing messages.

// - **Delete Contact Messages:** Remove contact messages from your database using the DELETE endpoint. Specify the message's ID to delete a specific entry.

// - **Create User Accounts:** Use the POST endpoint to add new user accounts to your database, providing details like full name, username, password, email, phone number, date of birth, and gender.

// - **Retrieve User Accounts:** The GET endpoint allows you to fetch a list of all user accounts or retrieve a specific account by its unique ID.

// - **Update User Accounts:** Easily update user account information using the PUT endpoint. Send the updated details in JSON format to modify existing accounts.

// - **Delete User Accounts:** Remove user accounts from your database using the DELETE endpoint. Specify the account's ID to delete a specific entry.

// **Sample Requests and Responses:** We've provided sample JSON requests and responses for each endpoint to help you understand how to interact with the API effectively.

// **Error Handling:** The API includes error responses and status codes to guide you in case of any issues.

// **API Documentation:** Explore the detailed API documentation below to learn how to use each endpoint, the expected request structures, and response formats.

// Start managing your student applications, contact messages, and user accounts effortlessly with the Fakad Infotech Centre Management API. Integrate it into your applications to streamline these management tasks and enhance user experiences.`
//   },
//   // Production
//   host: 'fakad-student-application.onrender.com',
//   schemes: ['https'],

//   // Develpoment
//   host: process.env.HOST || 'localhost:8080',
//   schemes: [process.env.SCHEMES || 'http'],

//   definitions: {
//     StudentApplication: {
//       type: 'object',
//       properties: {
//         firstName: { type: 'string' },
//         middleName: { type: 'string' },
//         lastName: { type: 'string' },
//         gender: { type: 'string' },
//         dateOfBirth: { type: 'string', format: 'date' },
//         maritalStatus: { type: 'string' },
//         phoneNumber: { type: 'string' },
//         email: { type: 'string' },
//         contactAddress: { type: 'string' },
//         occupation: { type: 'string' },
//         placeOfBirth: { type: 'string' },
//         stateOfOrigin: { type: 'string' },
//         localGovtArea: { type: 'string' },
//         homeTown: { type: 'string' },
//         villageAddress: { type: 'string' },
//         previousTraining: { type: 'string' },
//         previousTrainingDetails: { type: 'string' },
//         choiceOfTrainingProgramme: { type: 'string' },
//         passportPhotograph: { type: 'string' },
//         guardian: {
//           type: 'object',
//           properties: {
//             firstName: { type: 'string' },
//             middleName: { type: 'string' },
//             lastName: { type: 'string' },
//             gender: { type: 'string' },
//             maritalStatus: { type: 'string' },
//             phoneNumber: { type: 'string' },
//             email: { type: 'string' },
//             contactAddress: { type: 'string' },
//             occupation: { type: 'string' },
//             placeOfBirth: { type: 'string' },
//             stateOfOrigin: { type: 'string' },
//             localGovtArea: { type: 'string' },
//             homeTown: { type: 'string' },
//             villageAddress: { type: 'string' },
//             identificationType: { type: 'string' },
//             identificationUpload: { type: 'string' },
//             passportPhotograph: { type: 'string' }
//           }
//         },
//         nextOfKin: {
//           type: 'object',
//           properties: {
//             firstName: { type: 'string' },
//             middleName: { type: 'string' },
//             lastName: { type: 'string' },
//             gender: { type: 'string' },
//             maritalStatus: { type: 'string' },
//             relationship: { type: 'string' },
//             phoneNumber: { type: 'string' },
//             email: { type: 'string' },
//             contactAddress: { type: 'string' },
//             occupation: { type: 'string' },
//             placeOfBirth: { type: 'string' },
//             stateOfOrigin: { type: 'string' },
//             localGovtArea: { type: 'string' },
//             homeTown: { type: 'string' },
//             villageAddress: { type: 'string' }
//           }
//         }
//       }
//     },
//     ContactUs: {
//       type: 'object',
//       properties: {
//         name: { type: 'string' },
//         email: { type: 'string' },
//         phone: { type: 'string' },
//         subject: { type: 'string' },
//         message: { type: 'string' }
//       }
//     },
//     CreateAccount: {
//       type: 'object',
//       properties: {
//         fullName: { type: 'string' },
//         username: { type: 'string' },
//         password: { type: 'string' },
//         confirmPassword: { type: 'string' },
//         email: { type: 'string' },
//         phone: { type: 'string' },
//         dob: { type: 'string', format: 'date' },
//         gender: { type: 'string' },
//         terms: { type: 'boolean' },
//         privacy: { type: 'boolean' }
//       }
//     }
//   },
//   securityDefinitions: {
//     Bearer: {
//       type: 'apiKey',
//       name: 'Authorization',
//       in: 'header',
//       description: "Enter your bearer token in the format **Bearer <token>**"
//     }
//   },
//   paths: {
//     '/create-account': {
//       post: {
//         tags: ['Accounts'],
//         summary: 'Create a new user account',
//         security: [
//           {
//             Bearer: []
//           }
//         ],
//         parameters: [
//           {
//             in: 'body',
//             name: 'body',
//             required: true,
//             schema: {
//               $ref: '#/definitions/CreateAccount'
//             }
//           }
//         ],
//         responses: {
//           200: {
//             description: 'Account created successfully'
//           },
//           400: {
//             description: 'Invalid input'
//           }
//         }
//       }
//     }
//   }
// };

// const outputFile = './swagger.json';
// const endpointsFiles = ['./routes/index.js'];

// // Generate swagger.json
// swaggerAutogen(outputFile, endpointsFiles, doc);
// console.log('Swagger runs successfully');