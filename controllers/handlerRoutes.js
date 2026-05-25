const student = require("./student");
const teacher = require("./teacher");

const routes = {
    student: student.routes,
    teacher: teacher.routes,
};
module.exports = routes;
