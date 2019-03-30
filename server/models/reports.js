'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    name: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    description: DataTypes.STRING,
    placedby: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  reports.associate = function(models) {
    // associations can be defined here
  };
  return reports;
};