const express = require('express');
const router = express.Router();

// Include the Swagger documentation route
router.use('/send-welcome-email', require('./swagger'));

// Include the Fakad routes
router.use('/send-welcome-email', require('./emailRoutes'));


module.exports = router;