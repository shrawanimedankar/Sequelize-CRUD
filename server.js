require("dotenv").config();

const express = require("express");
const app = express();

const sequelize = require("./config/db");

const studentRoutes = require("./routes/student");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/students", studentRoutes);

// Sync Models
sequelize.sync()
.then(() => {
  console.log("Tables created");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});