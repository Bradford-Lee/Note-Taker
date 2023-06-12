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
app.use('/api', htmlRoutes);


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// DELETE
// notes.delete('/:note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/notes.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((note) => note.note_id !== noteId);
  
//         // Save that array to the filesystem
//         writeToFile('./db/notes.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Item ${noteId} has been deleted 🗑️`);
//       });
//   });

// module.exports = notes;

// module.exports = router;