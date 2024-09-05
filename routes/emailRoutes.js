// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const { body, validationResult } = require('express-validator');

// Route to send a registration email
router.post('/send-welcome-email', [
  // Validate input
  body('email').isEmail().withMessage('Invalid email address'),
  body('name').notEmpty().withMessage('Name is required'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name } = req.body;

  try {
    await emailController.sendEmail(
      email,
      'Welcome to Fakad Infotech Centre',
      'welcome.ejs',
      { name }
    );
    res.status(200).send('Welcome email sent successfully.');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

module.exports = router;
