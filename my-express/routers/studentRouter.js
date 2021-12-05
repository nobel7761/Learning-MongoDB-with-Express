const express = require('express');
const router = express.Router();

const studentList = (req, res) => {

};

const newStudent = (req, res) => {
    const student = req.body;

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