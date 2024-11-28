const express = require('express');
const { body, validationResult } = require('express-validator');
const emailController = require('../controllers/emailController');

const router = express.Router();

// Route for personalized emails
router.post(
  '/',
  [
    body('email').isArray().withMessage('Emails must be an array of email addresses'),
    body('email.*').isEmail().withMessage('Each email address must be valid'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('name').isArray().withMessage('Names must be an array'),
    body('name.*').notEmpty().withMessage('Each name must be valid')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, subject, name, dynamicContent } = req.body;

      if (email.length !== name.length) {
        return res.status(400).json({ message: 'Emails and names array length mismatch.' });
      }

      await emailController.sendPersonalizedEmails(email, name, subject, dynamicContent);

      res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.message });
    }
  }
);

// Route for sending dynamic invitation
router.post(
  '/send-invitation',
  [
    body('email').isArray().withMessage('Emails must be an array of email addresses'),
    body('email.*').isEmail().withMessage('Each email address must be valid'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('dynamicContent').isObject().withMessage('Dynamic content must be an object')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, subject, dynamicContent } = req.body;

      await emailController.sendDynamicEmail(email, subject, dynamicContent);

      res.status(200).json({ message: 'Invitation emails sent successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const emailController = require('../controllers/emailController');

// const router = express.Router();

// // Send Welcome Email to multiple recipients with personalized names
// router.post(
//   '/',
//   [
//     body('email').isArray().withMessage('Emails must be an array of email addresses'),
//     body('email.*').isEmail().withMessage('Each email address must be valid'),
//     body('subject').notEmpty().withMessage('Subject is required'),
//     body('name').isArray().withMessage('Names must be an array'),
//     body('name.*').notEmpty().withMessage('Each name must be valid'),
//     body('link').optional({ checkFalsy: true }).isURL().withMessage('Link must be a valid URL'), // Optional field
//     body('message').optional({ checkFalsy: true }).isString().withMessage('Message body must be valid'), // Optional field
//     body('imageUrls').optional().isArray().withMessage('Image URLs must be an array')
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { email, subject, name, link, message, imageUrls } = req.body;

//       // Ensure the length of emails and names arrays match
//       if (email.length !== name.length) {
//         return res.status(400).json({ message: 'The number of emails and names must match.' });
//       }

//       // Fallback to default image URL if no image URLs are provided
//       const images = (imageUrls && imageUrls.length > 0) 
//         ? imageUrls 
//         : ['']; // Provide a default image if none is provided

//       // Fallback for optional fields
//       const context = {
//         link: link || '', // Empty string if no link provided
//         message: message || '', // Empty string if no message provided
//         imageUrls: images // Pass the array of image URLs (or default)
//       };

//       // Send personalized emails
//       await emailController.sendPersonalizedEmails(email, name, subject, context);

//       res.status(200).json({ message: 'Emails sent successfully!' });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // New route for sending dynamic emails with custom content
// router.post(
//   '/send-invitation',
//   [
//     body('email').isArray().withMessage('Emails must be an array of email addresses'),
//     body('email.*').isEmail().withMessage('Each email address must be valid'),
//     body('name').isArray().withMessage('Names must be an array'),
//     body('subject').notEmpty().withMessage('Subject is required'),
//     body('dynamicContent').isObject().withMessage('Dynamic content must be an object')
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { email, name, subject, dynamicContent } = req.body;

//       // Send personalized emails
//       await emailController.sendPersonalizedEmails(email, name, subject, dynamicContent);

//       res.status(200).json({ message: 'Invitation emails sent successfully!' });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: error.message });
//     }
//   }
// );


// module.exports = router;