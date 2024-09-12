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
    body('link').isURL().withMessage('Link must be a valid URL'),
    body('name').notEmpty().withMessage('Name is required'),
    body('message').notEmpty().withMessage('Message body is required'),
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
        : ['']; // Provide a default image

      const context = {
        name,
        link,
        message,
        imageUrls: images // Pass the entire array of image URLs to the template
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

//       // Fallback to default image URL if none is provided
//       const image = (imageUrls && imageUrls.length > 0) ? imageUrls[0] : 'g';

//       const context = {
//         name,
//         link,
//         message,
//         imageUrl: image
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










// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const emailController = require('../controllers/emailController');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

// const router = express.Router();

// // Send Welcome Email
// router.post(
//   '/',
//   upload.fields([{ name: 'attachments', maxCount: 10 }, { name: 'images', maxCount: 10 }]), // Handle file uploads
//   [
//     body('email').isArray().withMessage('Emails must be an array of email addresses'),
//     body('email.*').isEmail().withMessage('Each email address must be valid'),
//     body('subject').notEmpty().withMessage('Subject is required'),
//     body('link').optional().isURL().withMessage('Link must be a valid URL'),
//     body('name').notEmpty().withMessage('Name is required'),
//     body('message').notEmpty().withMessage('Message body is required'),
//     body('imageUrls').optional().isJSON().withMessage('Image URLs must be a valid JSON array')
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { email, subject, link, name, message, imageUrls } = req.body;
//       const attachments = req.files['attachments'] || [];
//       const embeddedImages = req.files['images'] || [];

//       // Log received values for debugging
//       console.log('Received imageUrls:', imageUrls);

//       // Parse the image URLs (if any)
//       let imageUrlsArray = [];
//       if (imageUrls) {
//         try {
//           imageUrlsArray = JSON.parse(imageUrls); // Parse the JSON string into an array
//         } catch (error) {
//           console.error("Error parsing image URLs:", error);
//         }
//       }

//       // Fallback to default image URL if none is provided
//       const image = imageUrlsArray.length > 0 ? imageUrlsArray[0] : 'https://i.imgur.com/DjKKnUG.jpg';

//       // Define email context
//       const context = {
//         name,
//         link,
//         message,
//         imageUrl: image
//       };

//       // Send the email
//       await emailController.sendEmail(email, subject, 'welcome.ejs', context, attachments);

//       res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// module.exports = router;
