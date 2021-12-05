const express = require('express');
const router = express.Router();
const { Student } = require('../models/students');

const studentList = async (req, res) => {
    const student = await Student.find()
        .sort({ name: 1 });
    res.send(student);
};

const newStudent = async (req, res) => {
    const student = new Student(req.body);
    try {
        const result = await student.save();
        res.send(result);
    }
    catch (error) {
        const errMsg = [];
        for (field in error.errors) {
            errMsg.push(error.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }

};

const studentDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send("ID not found")
        }
        res.send(student);
    }
    catch (error) {
        return res.status(404).send("ID not found")
    }
};

const studentUpdate = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const student = await Student.findByIdAndUpdate(id, updatedData, { new: true, useFindAndModify: false });
        // findByIdAndUpdate 3 ta parameter ney!
        // id, 
        // updatedData, 
        // {new: true}=> new data submitted howar por jeno GUI a updated data show kore tai
        if (!student) {
            return res.status(404).send("ID not found")
        }
        res.send(student);
    }
    catch (error) {
        return res.status(404).send("ID not found")
    }

};

const studentDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send("ID not found")
        }
        res.send(student);
    }
    catch (error) {
        return res.status(404).send("ID not found")
    }
};

router.route('/')
    .get(studentList)
    .post(newStudent);

router.route('/:id')
    .get(studentDetail)
    .put(studentUpdate)
    .delete(studentDelete);

module.exports = router;