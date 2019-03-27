'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};