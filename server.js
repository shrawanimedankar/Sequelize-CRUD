require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
const sequelize = require("./config/db");

const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");

const PORT = process.env.PORT || 3000;

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/auth", require("./routes/auth"));

// Sync Models
sequelize.sync()
.then(() => {
  console.log("Tables created");
});

//Server Started
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});