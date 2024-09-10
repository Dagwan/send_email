const express = require('express');
const { body, validationResult } = require('express-validator');
const emailController = require('../controllers/emailController');
const path = require('path');

const router = express.Router();

// Send Welcome Email
router.post(
  '/',
  [
    body('email').isArray().withMessage('Email must be an array of valid email addresses'),
    body('email.*').isEmail().withMessage('Invalid email address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('link').isURL().withMessage('Invalid link URL'),
    body('attachments').optional().isArray().withMessage('Attachments should be an array'),
    body('attachments.*.filename').optional().notEmpty().withMessage('Attachment filename is required'),
    body('attachments.*.path').optional().notEmpty().withMessage('Attachment path is required'),
    body('attachments.*.cid').optional().notEmpty().withMessage('Attachment cid is required for embedded images'),
    body('attachments.*.embed').optional().isBoolean().withMessage('Embed must be a boolean')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, link, attachments } = req.body;

    // Resolve absolute paths for attachments
    const resolvedAttachments = attachments ? attachments.map(att => ({
      ...att,
      path: path.resolve(__dirname, '../', att.path),
    })) : [];

    try {
      await emailController.sendEmail(
        email, // Now an array of emails is accepted
        'Welcome to Fakad Infotech Centre',
        'welcome.ejs',
        { name, link },
        resolvedAttachments
      );
      res.status(200).send('Welcome email sent successfully.');
    } catch (error) {
      res.status(500).send(`Failed to send email: ${error.message}`);
    }
  }
);

module.exports = router;