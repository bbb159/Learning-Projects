'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    Name: DataTypes.STRING,
    BirthDate: DataTypes.DATE,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};