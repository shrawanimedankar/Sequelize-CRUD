const express = require('express');
const router = express.Router();
const controller = require('../controllers/teacher.js');

router.get('/', controller.getAllTeachers);

module.exports = router;
