const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected MongoDB"))
    .catch(err => console.error("Connection Failed"))

// Schema => defines the shape of documents (mongoose feature! not mongoDB)
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String, required: [true, "Last Name: Please Enter Last Name"] },
    dob: {
        type: Date,
        validate: {
            validator: (value) => value > new Date("1 January 2000"),
            message: "DOB: Date Must Be After 1 January 2000"
        }
    },
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: (value) => value.length > 0,
            message: "Hobbies: There must be at least 1 hobby"
        }
    },
    parents: {
        father: String,
        mother: String
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 80 } }]
})

//Model (mongoose feature! not mongoDB)
const Student = mongoose.model('Student', studentSchema); //model() will receive 2 parameters! 1st = collection_name, 2nd = Schema_Name

async function createStudent() {
    try {
        const data = await Student.create({
            firstName: "Abdur",
            // lastName: "Razzak",
            dob: new Date("21 June 1997"),
            passed: true,
            hobbies: [],
            parents: {
                father: "Abdur Razzak",
                mother: "Parul Begum"
            },
            subjects: [{ name: "Math", marks: 65 }, { name: "Bangla", marks: 70 }]
        });

        console.log(data);
    }
    catch (error) {
        for (field in error.errors) {
            console.log(error.errors[field].message)
        }
    }

}

createStudent();

