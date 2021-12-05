const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected MongoDB"))
    .catch(err => console.error("Connection Failed"))

// Schema => defines the shape of documents (mongoose feature! not mongoDB)
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: String,
    dob: Date,
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: [String],
    parents: {
        father: String,
        mother: String
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 80 } }]
})

//Model (mongoose feature! not mongoDB)
const Student = mongoose.model('Student', studentSchema); //model() will receive 2 parameters! 1st = collection_name, 2nd = Schema_Name

const student = new Student({
    firstName: "Md. Habibur",
    lastName: "Rahaman",
    dob: new Date("21 June 1997"),
    passed: true,
    hobbies: ["Coding", "Leading", "Video Editing"],
    parents: {
        father: "Abdur Razzak",
        mother: "Parul Begum"
    },
    subjects: [{ name: "Math", marks: 65 }, { name: "Bangla", marks: 70 }]
})

//CRUD

//C => Create
async function createStudent() {


    try {
        const data = await student.save();//save() function will save student document in mongoDb
        console.log(data);
    }
    catch (error) {
        console.log(error._message);
    }
}

// createStudent();

//R => Read
async function readStudent() {
    try {
        const data = await Student
            .find()
            .limit(10)
            .sort({ firstName: -1 /*descending order*/, lastName: 1 })
            .select({ firstName: 1, lastName: 1, hobbies: 1 });
        console.log(data);
    }
    catch (error) {
        console.log(error._message);
    }
}

readStudent();