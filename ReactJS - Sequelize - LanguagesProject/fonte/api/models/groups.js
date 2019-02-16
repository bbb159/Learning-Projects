'use strict';
module.exports = (sequelize, DataTypes) => {
  var Groups = sequelize.define('Groups', {
    Name: DataTypes.STRING,
    Language: DataTypes.STRING,
    Description: DataTypes.STRING
  }, {});
  Groups.associate = function(models) {
    // associations can be defined here
  };
  return Groups;
};