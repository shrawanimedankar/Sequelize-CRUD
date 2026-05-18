const db = require('../config/db');

// ─── READ ALL  ───  GET /api/teachers
const getAllTeachers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM teacher ORDER BY id ASC');
        // console.log(rows[3]);
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        console.error('getAllTeachers error:', error.message);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {getAllTeachers};