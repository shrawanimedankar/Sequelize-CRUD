const Teacher = require("../models/teacher");
const { sendResponse } = require("../utils/common");

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({ order: [["id", "ASC"]], });
        // res.status(200).json({status:true, count:teachers.length, data:teachers,});
        return sendResponse(res, {
            success: true,
            status_code: 200,
            message: "Teacher fetched successfully",
            data: teachers,
        });
    }
    catch (error) {
        // res.status(500).json({success:false,message:error.message,});
        return sendResponse(res, {
            success: false,
            status_code: 500,
            message: "Failed to fetched teachers",
            error,
        });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const { id } = req.body;
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            // res.status(404).json({status:false, message:"Teacher not found"});
            return sendResponse(res, {
                success: false,
                status_code: 404,
                message: "Teacher not found",
            });
        }
        //    res.status(200).json({status:true, data: teacher,});
        return sendResponse(res, {
            success: true,
            status_code: 200,
            message: "Teacher fetched successfully",
            data: teacher,
        });
    }
    catch (error) {
        // res.status(500).json({success:false,message:error.message,});
    }
};

const createTeacher = async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        const teacher = await Teacher.create({ name, email, subject, });
        // res.status(200).json({status:true, data:teacher,});
        return sendResponse(res, {
            success: true,
            status_code: 201,
            message: "Teacher created successfully",
            data: teacher,
        });
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {

            // return res.status(409).json({success:false, message:"Email already exist"});
            return sendResponse(res, {
                success: false,
                status_code: 409,
                message: "Email already exist",
                error,
            });
        }
        // res.status(500).json({status:false, message:error.message,});
        return sendResponse(res, {
            success: false,
            status_code: 500,
            message: "Failed to create teacher",
            error,
        });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const { id, name, email, subject } = req.body;
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            // return res.status(404).json({ status: false, message: "Teacher not found", });
            return sendResponse(res, {
                success: false,
                status_code: 404,
                message: "Teacher not found",
            });
        }
        await teacher.update({ name, email, subject, });
        // res.status(200).json({ success: true, data: teacher, });
        return sendResponse(res, {
            success: true,
            status_code: 200,
            message: "Teacher updated successfully",
            data: teacher,
        });
    }
    catch {
        if (error.name === "SequelizeUniqueConstraintError") {
            // res.status(409).json({ success: false, message: "Email already exist" });
            return sendResponse(res, {
                success: false,
                status_code: 409,
                message: "Email already exist",
                error,
            });
        }
        // res.status(500).json({ success: false, message: error.message });
        return sendResponse(res, {
            success: false,
            status_code: 500,
            message: "Failed to update teacher",
            error,
        });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.body;
        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            // return res.status(404).json({ status: false, message: "Teacher with {id} not found" });
            return sendResponse(res, {
                success: false,
                status_code: 404,
                message: "Teacher not found",
            });
        }
        await teacher.destroy();
        // res.status(200).json({ success: true, message: "Teacher deleted successfully", });
        return sendResponse(res, {
            success: true,
            status_code: 200,
            message: "Teacher deleted successfully",
            data: teacher,
        });
    }
    catch (error) {
        // res.status(500).json({ success: false, message: error.message, });
        return sendResponse(res, {
            success: false,
            status_code: 500,
            message: "Failed to delete Teacher",
            error,
        });
    }
};

module.exports = { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher };