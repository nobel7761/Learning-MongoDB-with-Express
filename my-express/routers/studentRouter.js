const express = require('express');
const router = express.Router();
const { Student } = require('../models/students');

const studentList = (req, res) => {

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

const studentDetail = (req, res) => {
    const id = parseInt(req.params.id);

};

const studentUpdate = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

};

const studentDelete = (req, res) => {
    const id = parseInt(req.params.id);

};

router.route('/')
    .get(studentList)
    .post(newStudent);

router.route('/:id')
    .get(studentDetail)
    .put(studentUpdate)
    .delete(studentDelete);

module.exports = router;