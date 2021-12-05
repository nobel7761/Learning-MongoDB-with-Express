const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log("Connected MongoDB"))
    .catch(err => console.error("Connection Failed"))