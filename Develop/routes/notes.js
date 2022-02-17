const notesRoute = require('express').Router();
const notes = require('../db/db.json')
const fs = require('fs');

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
notesRoute.get('/', (req, res) => {
  console.info(`${req.method} request received to get notes`);
  return res.json(notes)
}
);
//




module.exports = notesRoute;