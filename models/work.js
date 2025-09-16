const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contract");
const Employer = require("./employer");

const Work = sequelize.define("work", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});

Contract.hasMany(Work);
Work.belongsTo(Contract);

Employer.hasMany(Work);
Work.belongsTo(Employer);

module.exports = Work;
