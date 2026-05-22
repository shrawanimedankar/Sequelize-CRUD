const Student = require("../models/student");
const { sendResponse } = require("../utils/common");
const bcrypt = require("bcrypt");

// GET ALL
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ order: [["id", "ASC"]] });
    // res.status(200).json({ success: true, count: students.length, data: students,});
    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Student fetched successfully",
      data: students,
    });
  }
  catch (error) {
    // res.status(500).json({ success: false, message: error.message,});
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to fetched students",
      error,
    });
  }
};

// GET BY ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findByPk(id);
    // const student = await Student.findByPk(req.params.id);

    if (!student) {
      // return res.status(404).json({ success: false, message: "Student not found", });
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Student not found",
      });
    }
    // res.status(200).json({ success: true, data: student, });
    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Student fetched successfully",
      data: student,
    });
  }
  catch (error) {
    // res.status(500).json({ success: false, message: error.message, });
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to fetch student",
      error,
    });
  }
};

// CREATE
const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const student = await Student.create({ name, email, password: hashedPassword, });
    // res.status(201).json({ success: true, data: student, });
    return sendResponse(res, {
      success: true,
      status_code: 201,
      message: "Student created successfully",
      data: student,
    });
  }
  catch (error) {
    // console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      // return res.status(409).json({ success: false, message: 'A student with that email already exist' });
      return sendResponse(res, {
        success: false,
        status_code: 409,
        message: "Email already exist",
        error,
      });
    }
    // res.status(500).json({ success: false, message: error.message, });
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to create student",
      error,
    });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const student = await Student.findByPk(id);

    if (!student) {
      // return res.status(404).json({ success: false, message: "Student not found", });
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Student not found",
      });
    }
    await student.update({ name, email, });
    // res.status(200).json({ success: true, data: student, });
    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Student updated successfully",
      data: student,
    });
  }
  catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      // return res.status(409).json({ success: false, message: 'A student with that email already exist' });
      return sendResponse(res, {
        success: false,
        status_code: 409,
        message: "Email already exist",
        error,
      });
    }
    // res.status(500).json({ success: false, message: error.message, });
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to update student",
      error,
    });
  }
};

// destroy
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findByPk(id);
    if (!student) {
      // return res.status(404).json({ success: false, message: "Student not found", });
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Student not found",
      });
    }
    await student.destroy();
    // res.status(200).json({ success: true, message: "Student deleted successfully", });
    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Student deleted successfully",
      data: student,
    });
  }
  catch (error) {
    // res.status(500).json({ success: false, message: error.message, });
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to delete student",
      error,
    });
  }
};

// module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };

module.exports = {
  routes: [
    {
      method: "post",
      path: "/",
      handler: getAllStudents,
    },
    {
      method: "post",
      path: "/getById",
      handler: getStudentById,
    },
    {
      method: "post",
      path: "/create",
      handler: createStudent,
    },
    {
      method: "post",
      path: "/update",
      handler: updateStudent,
    },
    {
      method: "post",
      path: "/delete",
      handler: deleteStudent,
    },
  ],
};