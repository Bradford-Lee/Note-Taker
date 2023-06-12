// require router & path
const router = require('express').Router();
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
router.get('/api/notes', async (req, res) => {
    const db = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(db);
});

// POST
router.post('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        note_id: uuidv4(),
    };
    db.push(newNote);
    fs.writeFileSync("db/db.json",JSON.stringify(db));
    res.json(db);
});

module.exports = router;