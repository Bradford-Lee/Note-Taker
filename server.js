// require express and routes
const express = require('express');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');

// listen on 3001 port
const PORT = process.env.port || 3001;

// create new server to configure
const app = express();

// Middleware for parsing JSON and urlencoded form data, front end gets to back end on request data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// look for files in public folder
app.use(express.static('public'));

// setting up routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);