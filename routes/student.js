//  URL pattern          HTTP Method   Controller function
//  /api/students        GET      →    getAllStudents
//  /api/students/:id    GET      →    getStudentById
//  /api/students        POST     →    createStudent
//  /api/students/:id    PUT      →    updateStudent
//  /api/students/:id    DELETE   →    deleteStudent

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student');

router.post('/', controller.getAllStudents); //READ/GET ALL students

router.post('/getById', controller.getStudentById); // READ/GET ONE student by id

router.post('/create', controller.createStudent); // CREATE a new student

router.post('/update', controller.updateStudent); //UPDATE an existing student

router.post('/delete', controller.deleteStudent); // DELETE a student

module.exports = router;
