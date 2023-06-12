// import NPM packages & public folder
const express = require('express');
const path = require('path');
// const api = require('./public/assets/js/index.js');
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    // writeToFile,
  } = require('./helpers/fsUtils');

// listen on 3001 port
const PORT = process.env.port || 3001;

// create new server to configure
const app = express();

// const app = require('./db/notes.json')
const fs = require('fs')

// Middleware for parsing JSON and urlencoded form data, front end gets to back end on request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting up routes
// app.use('/api', api);

// look for files in public folder
app.use(express.static('public'));

// GET Route for retrieving all the notes
// /api/db
app.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST
app.post('/api/notes', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    }
    // fs.writeFileSync('./db/notes.json', JSON.stringify(data));
    // res.json(data);
});


// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
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