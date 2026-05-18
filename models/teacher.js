const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/db');

const Teacher = sequelize.define("Teacher",
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
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "teacher",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

module.exports = Teacher;
