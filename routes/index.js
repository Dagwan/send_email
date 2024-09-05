const express = require('express');
const router = express.Router();

// Include the Swagger documentation route
router.use('/application-form', require('./swagger'));

// Include the Fakad routes
router.use('/application-form', require('./fakadRoutes'));
router.use('/contact-us', require('./contactUsRoutes'));

// Include the create-account routes
const createAccountRoutes = require('./createAccountRoutes');
router.use('/create-account', createAccountRoutes);

module.exports = router;