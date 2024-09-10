const express = require('express');
const { body, validationResult } = require('express-validator');
const emailController = require('../controllers/emailController');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Send Welcome Email
router.post(
  '/',
  upload.any(), // Handle multipart/form-data
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('link').isURL().withMessage('Invalid link URL'),
    body('attachments').optional().isArray().withMessage('Attachments should be an array'),
    body('attachments.*.filename').optional().notEmpty().withMessage('Attachment filename is required'),
    body('attachments.*.path').optional().notEmpty().withMessage('Attachment path is required'),
    body('attachments.*.cid').optional().notEmpty().withMessage('Attachment cid is required for embedded images'),
    body('attachments.*.embed').optional().isBoolean().withMessage('Embed must be a boolean'),
    body('embeddedImages').optional().isArray().withMessage('Embedded images should be an array'),
    body('embeddedImages.*.filename').optional().notEmpty().withMessage('Embedded image filename is required'),
    body('embeddedImages.*.path').optional().notEmpty().withMessage('Embedded image path is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, link, attachments, embeddedImages } = req.body;

    // Convert files from `req.files` (Multer) to attachment objects
    const resolvedAttachments = (attachments || []).map(att => ({
      filename: att.filename,
      path: path.resolve(__dirname, '../', att.path),
    }));

    const resolvedEmbeddedImages = (embeddedImages || []).map((file, index) => ({
      filename: file.originalname,
      path: file.path,
      cid: `img${index}@fakad`,
      embed: true
    }));

    try {
      await emailController.sendEmail(
        email,
        'Welcome!',
        'welcome.ejs', // Your email template
        {
          name,
          link,
          message: req.body.message,
          embeddedImages: resolvedEmbeddedImages
        },
        [...resolvedAttachments, ...resolvedEmbeddedImages]
      );
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;




// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const emailController = require('../controllers/emailController');
// const path = require('path');

// const router = express.Router();

// // Send Welcome Email
// router.post(
//   '/',
//   [
//     body('email')
//       .custom(value => Array.isArray(value) || typeof value === 'string')
//       .withMessage('Email must be a valid email address or an array of emails')
//       .bail()
//       .custom((emails) => {
//         if (Array.isArray(emails)) {
//           return emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
//         }
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails);
//       })
//       .withMessage('Each email must be valid'),

//     body('name').notEmpty().withMessage('Name is required'),

//     body('link')
//       .custom(value => Array.isArray(value) || typeof value === 'string')
//       .withMessage('Link must be a valid URL or an array of URLs')
//       .bail()
//       .custom((links) => {
//         if (Array.isArray(links)) {
//           return links.every(link => /^https?:\/\/.+$/.test(link));
//         }
//         return /^https?:\/\/.+$/.test(links);
//       })
//       .withMessage('Each link must be valid'),

//     body('attachments').optional().isArray().withMessage('Attachments should be an array'),
//     body('attachments.*.filename')
//       .optional()
//       .notEmpty()
//       .withMessage('Attachment filename is required'),
//     body('attachments.*.path')
//       .optional()
//       .notEmpty()
//       .withMessage('Attachment path is required'),
//     body('attachments.*.cid')
//       .optional()
//       .notEmpty()
//       .withMessage('Attachment cid is required for embedded images'),
//     body('attachments.*.embed')
//       .optional()
//       .isBoolean()
//       .withMessage('Embed must be a boolean'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log('Validation errors:', errors.array());
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, name, link, attachments } = req.body;

//     // Resolve absolute paths for attachments
//     const resolvedAttachments = attachments
//       ? attachments.map((att) => ({
//           ...att,
//           path: att.path, // No need for path.resolve here; it's not a relative path
//         }))
//       : [];

//     try {
//       const linksArray = Array.isArray(link) ? link : [link];
//       const linksHtml = linksArray.map((url) => `<p><a href="${url}">${url}</a></p>`).join('');

//       await emailController.sendEmail(
//         Array.isArray(email) ? email : [email],
//         'Welcome to Fakad Infotech Centre',
//         'welcome.ejs',
//         { name, linksHtml },
//         resolvedAttachments
//       );
//       res.status(200).send('Email sent successfully.');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).send(`Failed to send email: ${error.message}`);
//     }
//   }
// );

// module.exports = router;

