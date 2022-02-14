const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();


//route to the notes.html file
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//wildcard route to direct users to main html page
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
)





