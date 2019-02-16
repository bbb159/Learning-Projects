'use strict';
module.exports = (sequelize, DataTypes) => {
  var UsersGroups = sequelize.define('UsersGroups', {
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {});
  UsersGroups.associate = function(models) {
    // associations can be defined here
  };
  return UsersGroups;
};