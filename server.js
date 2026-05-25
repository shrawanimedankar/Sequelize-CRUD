require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
const sequelize = require("./config/db");

const PORT = process.env.PORT || 3000;

app.use("/api", routes);

// Sync Models
sequelize.sync()
  .then(() => {
    console.log("Tables created");
  });

//Server Started
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});