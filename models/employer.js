const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Employer = sequelize.define("employer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  experience_year: {
    type: DataTypes.INTEGER,
  },
  salary: {
    type: DataTypes.INTEGER,
  },
  start_work_day: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Employer;
