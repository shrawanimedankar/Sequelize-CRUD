const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const { sendResponse } = require("../utils/common");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return sendResponse(res, {
                success: false,
                status_code: 409,
                message: "Email already exist",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            name, email, password: hashedPassword,
        });
        return sendResponse(res, {
            success: true,
            status_code: 200,
            message: "Signup successful",
            data: student,
        });
    }
    catch (error) {
        return sendResponse(res, {
            success: false,
            status_code: 500,
            message: error.message,
            error,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ where: { email } });
        if (!student) {
            return sendResponse(res, {
                success: false,
                status_code: 404,
                message: "Student not found",
            });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return sendResponse(res, {
                success: false,
                status_code: 401,
                message: "Invalid password",
            });
        }
        const token = jwt.sign(
            { id: student.id, email: student.email, },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log(process.env.JWT_SECRET);
        res.setHeader("Authorization", `${token}`);
        // res.setHeader("Login", "api/students");
        return sendResponse(res, {
            success: true,
            status_code: 200,
            message: "Login successful",
            data: {
                token,
            },
        });

    } catch (error) {
        return sendResponse(res, {
            success: false,
            status_code: 500,
            message: error.message,
            error,
        });
    }
};

module.exports = { signup, login };

