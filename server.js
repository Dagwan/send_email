// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const path = require('path');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

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
  res.send('Welcome to London\'s Email System API');
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
if (process.env.NODE_ENV === 'production') {
  // Check if SSL certificates are available
  const sslOptions = {
    key: fs.existsSync(path.join(__dirname, 'ssl', 'server.key')) ? fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')) : null,
    cert: fs.existsSync(path.join(__dirname, 'ssl', 'server.crt')) ? fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')) : null
  };

  // If SSL certificates are available, use HTTPS, else fallback to HTTP
  if (sslOptions.key && sslOptions.cert) {
    https.createServer(sslOptions, app).listen(port, () => {
      console.log(`Server running on https://localhost:${port}`);
    });
  } else {
    console.log('SSL certificates not found, falling back to HTTP');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
} else {
  // For development, use HTTP
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}



// // server.js
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const emailRoutes = require('./routes/emailRoutes'); 
// const path = require('path');
// const cors = require('cors'); 

// const app = express();
// const port = process.env.PORT || 8080;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Serve static files (if needed)
// app.use(express.static(path.join(__dirname, 'public')));

// // Set view engine and views directory for EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Use routes defined in separate files
// app.use('/', require('./routes'));

// // Default route
// app.get('/', (req, res) => {
//   res.send('Welcome to londons Email System API');
// });

// // Global error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
