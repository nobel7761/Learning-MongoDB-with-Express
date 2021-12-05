const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
    res.send("Hello from express js!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});

// Mongoose -> Model -> Collection
// Import Model
// Connect Database