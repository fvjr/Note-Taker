//requirements
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes/index.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

//html route to default index html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//html route to notes html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//wild card route to direct users to primary index
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')
  )
);

//port listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);