const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

//console.log(app.get('env')); // set by express
//console.log(process.env); // set by node

mongoose.connect('mongodb://localhost:27017/my-student-2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("MongoDB Connection Failed!"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});