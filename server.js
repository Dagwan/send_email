// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes'); // Ensure the correct path
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes defined in separate files
app.use('/', require('./routes'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to London Graduate Email System API');
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
