const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false, //stop Sequelize from printing SQL queries in terminal.
    pool: {
      max: 5,   //Maximum 5 database connections can be active at same time.
      min: 0,  //Minimum connections to keep open, if no request comes, all connections can close
      idle: 10000, //If a connection is unused for 10000 milliseconds (10 sec), Sequelize will close it.
    },
  }
);

// Test Connection
sequelize.authenticate()
  .then(() => {
    console.log("MySQL Sequelize Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.log(err.message);
  });

module.exports = sequelize;