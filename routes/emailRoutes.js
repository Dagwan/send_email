const express = require('express');
const { body, validationResult } = require('express-validator');
const emailController = require('../controllers/emailController');

const router = express.Router();

// Send Welcome Email
router.post(
  '/',
  [
    body('email').isArray().withMessage('Emails must be an array of email addresses'),
    body('email.*').isEmail().withMessage('Each email address must be valid'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('link').optional({ checkFalsy: true }).isURL().withMessage('Link must be a valid URL'), // Link is optional
    body('name').notEmpty().withMessage('Name is required'),
    body('message').optional({ checkFalsy: true }).isString().withMessage('Message body must be valid'), // Message is optional
    body('imageUrls').optional().isArray().withMessage('Image URLs must be an array')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, subject, link, name, message, imageUrls } = req.body;

      // Fallback to default image URL if no image URLs are provided
      const images = (imageUrls && imageUrls.length > 0) 
        ? imageUrls 
        : ['']; // Provide a default image if none is provided

      // Fallback for optional fields
      const context = {
        name,
        link: link || '', // Empty string if no link provided
        message: message || '', // Empty string if no message provided
        imageUrls: images // Pass the array of image URLs (or default)
      };

      await emailController.sendEmail(email, subject, 'welcome.ejs', context);

      res.status(200).json({ message: 'Email sent successfully!' });
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

// // Send Welcome Email
// router.post(
//   '/',
//   [
//     body('email').isArray().withMessage('Emails must be an array of email addresses'),
//     body('email.*').isEmail().withMessage('Each email address must be valid'),
//     body('subject').notEmpty().withMessage('Subject is required'),
//     body('link').isURL().withMessage('Link must be a valid URL'),
//     body('name').notEmpty().withMessage('Name is required'),
//     body('message').notEmpty().withMessage('Message body is required'),
//     body('imageUrls').optional().isArray().withMessage('Image URLs must be an array')
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { email, subject, link, name, message, imageUrls } = req.body;

//       // Fallback to default image URL if no image URLs are provided
//       const images = (imageUrls && imageUrls.length > 0) 
//         ? imageUrls 
//         : ['']; // Provide a default image

//       const context = {
//         name,
//         link,
//         message,
//         imageUrls: images // Pass the entire array of image URLs to the template
//       };

//       await emailController.sendEmail(email, subject, 'welcome.ejs', context);

//       res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// module.exports = router;

