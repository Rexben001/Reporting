'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    color: DataTypes.STRING,
    size: DataTypes.STRING
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
  };
  return Shop;
};