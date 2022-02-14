const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs')
const notes = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//route to the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//route to return all saved notes as JSON
app.get('/api/notes', (req, res) =>
  res.json(notes)
);

//route to post notes to db.json file
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note!`)
  console.log(req.body);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text
    };

    const newNoteString = JSON.stringify(newNote);

    fs.appendFile(`./db/db.json`, newNoteString, (err) =>
    err
    ? console.error(err)
    :console.log('New note has been added')
    
    );

 const response = {
      status: `success`,
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in submitting note')
  }

});


//wildcard route to direct users to main html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


//port listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
)





