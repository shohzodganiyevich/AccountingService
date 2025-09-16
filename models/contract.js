const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("./../config/db");
const Client = require("./client");

const Contract = sequelize.define("contract", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  date_contract: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  exp_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  summa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Client.hasMany(Contract);
Contract.belongsTo(Client);

module.exports = Contract;
