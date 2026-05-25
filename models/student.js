const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "student",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

module.exports = Student;
