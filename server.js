require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const path = require('path');
const cors = require('cors'); // Add this line if using CORS

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Add this line if using CORS

// Serve static files (if needed, e.g., images for emails)
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/email', emailRoutes);

// Default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to Fakad Infotech Centre Email System API');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
