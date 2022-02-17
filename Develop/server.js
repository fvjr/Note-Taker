const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
//get notes --MOVE TO ROUTES
const api = require('./routes/index.js');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


//get notes --MOVE THIS TO ROUTES
// app.get('/api/notes', (req, res) =>
//   res.json(notes)
// );

// returning json of notes
// app.get('/api/notes', (req, res) => {
//   console.info(`${req.method} request received to get notes`);
//   return res.json(notes)
// }
// );



//



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