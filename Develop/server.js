const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs')
const notes = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//route to the notes.html file
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
res.json(notes)
);

//wildcard route to direct users to main html page
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


//port listener
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
)





