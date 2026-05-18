const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

// Test Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Sequelize Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.log(err.message);
  });

module.exports = sequelize;
