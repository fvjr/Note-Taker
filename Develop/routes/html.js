const htmlRoute = require('express').Router();
const index = require('../public/index.html');

htmlRoute.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

module.exports = htmlRoute;