//  URL pattern          HTTP Method   Controller function
//  /api/students        GET      →    getAllStudents
//  /api/students/:id    GET      →    getStudentById
//  /api/students        POST     →    createStudent
//  /api/students/:id    PUT      →    updateStudent
//  /api/students/:id    DELETE   →    deleteStudent

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student');
const authenticateJWT = require("../middleware/jwtAuth");

router.post('/', authenticateJWT, controller.getAllStudents); //READ/GET ALL students

router.post('/getById', authenticateJWT, controller.getStudentById); // READ/GET ONE student by id

router.post('/create', authenticateJWT, controller.createStudent); // CREATE a new student

router.post('/update', authenticateJWT, controller.updateStudent); //UPDATE an existing student

router.post('/delete', authenticateJWT, controller.deleteStudent); // DELETE a student

module.exports = router;
