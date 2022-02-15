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
// app.post('/api/notes', (req, res) => {
//   console.info(`${req.method} request received to add a note!`)
//   console.log(req.body);
//   const { title, text } = req.body;

//   if (title && text) {
//     const newNote = {
//       title,
//       text
//     };

//     fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(data)
//         const parsedNotes = JSON.parse(data);

//         parsedNotes.push(newNote);

//         fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes, null, 4),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully added note!')
//         );

//       }
//     })

//     // const newNoteString = JSON.stringify(newNote);

//     // fs.writeFileSync(`./db/db.json`, newNoteString, (err) =>
//     //   err
//     //     ? console.error(err)
//     //     : console.log('New note has been added')

//     // );

//     const response = {
//       status: `success`,
//       body: newNote,
//     };
//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in submitting note')
//   }

// });

//route to post notes to db.json file
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note.`)

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully added note!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

console.log(response);
res.status(201).json(response);
  } else {
    res.status(500).json('Error in positing note');
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





