const express = require('express');
const router = express.Router();

// Include the Swagger documentation route
router.use('/', require('./swagger'));

// Include the Fakad routes
router.use('/send-invitation-email', require('./emailRoutes'));


module.exports = router;