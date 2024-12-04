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