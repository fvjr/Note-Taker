//main index for all routes, this index will be referenced to as api in server.js
const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;