const express = require('express');
const notesRoute = require('express').Router();
const notes = require('../db/db.json')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notesRoute.use(express.json());
notesRoute.use(express.urlencoded({ extended: true }));

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
notesRoute.get('/', (req, res) => {
  console.info(`${req.method} request received to read notes.`)
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      //return saved notes as JSON
      return res.json(JSON.parse(data))
    }
  })
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notesRoute.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note.`);
  //destructuring items in req.body
  const { title, text } = req.body;
//if all needed info for a new note is available, make a new note
console.log(1)
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    };
//obtain existing notes
console.log(2)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        //convert string into JSON object
        const parsedNotes = JSON.parse(data);
//add a new note to database json
        parsedNotes.push(newNote);
        console.log(newNote);
        //write updated array to db.json
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successully added note!')
        );
      }
    });
    const response = {
      //new note show in JSON
      status: 'success',
      body: newNote,
    };
//new note shown in console.log for testing purposes
    // console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
return response
  }
});


module.exports = notesRoute;