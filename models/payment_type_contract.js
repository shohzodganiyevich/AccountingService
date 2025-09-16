const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const PaymentType = require("./payment_type");

const PaymentTypeContract = sequelize.define("payment_type_contract", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signed_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

PaymentType.hasMany(PaymentTypeContract);
PaymentTypeContract.belongsTo(PaymentType);

module.exports = PaymentTypeContract;
