const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');


const port = process.env.PORT || 8080;
const app = express();

// Enable CORS for all routes
app.use(cors());

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret', 
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

// Use routes defined in separate files
app.use('/', require('./routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


    app.listen(port, () => {
      console.log(`Running and listening on port ${port}`);
      console.log('London Graduate successfully initialized');
    });


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
