const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const PaymentType = sequelize.define("payment_type", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PaymentType;
