const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Admin = require("./admin");

const News = sequelize.define("new", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  describtion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Admin.hasMany(News);
News.belongsTo(Admin);

module.exports = News;
