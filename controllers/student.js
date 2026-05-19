const Student = require("../models/student");

// GET ALL
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ order: [["id", "ASC"]], });
    res.status(200).json({ success: true, count: students.length, data: students,});
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message,});
  }
};

// GET BY ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findByPk(id);
    // const student = await Student.findByPk(req.params.id);
    
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found", });
    }
    res.status(200).json({ success: true, data: student, });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message,});
  }
};

// CREATE
const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.create({ name, email,});
    res.status(201).json({ success: true, data: student, });
  } 
  catch (error) {
    // console.log(error);
    if(error.name === "SequelizeUniqueConstraintError"){
      return res.status(409).json({success:false, message:'A student with that email already exist'});
    }
    res.status(500).json({ success: false, message: error.message,});
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found", });
    }
    await student.update({ name, email, });
    res.status(200).json({ success: true, data: student, });
  } 
  catch (error) {
    if(error.name === "SequelizeUniqueConstraintError"){
      return res.status(409).json({success:false, message:'A student with that email already exist'});
    }
    res.status(500).json({ success: false, message: error.message, });
  }
};

// destroy
const deleteStudent = async (req, res) => {
  try {
    const {id} = req.body;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found", });
    }
    await student.destroy();
    res.status(200).json({ success: true,  message: "Student deleted successfully", });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message, });
  }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };