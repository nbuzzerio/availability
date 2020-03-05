const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AvailableDogs = require('../database/availability.js');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('./client/dist'));

//api routes
app.get('/getAllMatchingBreed', (req, res) => {
  console.log(req.query)
  var breedKey = req.query.key;
  AvailableDogs.find({breedKeys: breedKey}, 'location imageURL name', (err, dogs) => {
    if (err) {
      throw err;
    }
    res.send(dogs);
  })
})

const port = 3003;
app.listen(port, () => console.log(`The server is Running on port ${port}!`));