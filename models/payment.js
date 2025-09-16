const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contract");
const PaymentType = require("./payment_type");

const Payment = sequelize.define("payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  summa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Contract.hasMany(Payment);
Payment.belongsTo(Contract);

PaymentType.hasMany(Payment);
Payment.belongsTo(PaymentType);

module.exports = Payment;
