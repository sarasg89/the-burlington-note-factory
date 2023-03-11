const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const path = require('path');

// GET route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile(path.join(__dirname, '../db/notes.json')).then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { noteTitle, noteText } = req.body;

    if (req.body) {
        const newNote = {
            noteTitle,
            noteText,
            noteId: uuid(),
        };

        readAndAppend(newNote, path.join(__dirname, '../db/notes.json'));
        res.json(`Note saved successfully`);
    } else {
        res.errored('Error in saving note');
    }
});

// DELETE route for existing notes
notes.delete('/:noteId', (req, res) => {
    console.log(req.params);

    if (req.params) {
        const { noteId } = req.params;

        deleteFromFile(path.join(__dirname, '../db/notes.json'), noteId);
        res.json(`Note deleted successfully`);
    } else {
        res.errored('Error in deleting note');
    }
});

module.exports = notes;