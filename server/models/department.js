'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    allowNull: false
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Employee, {
        foreignKey: 'departmentID',
        as: 'employees'
    });
  };
  return Department;
};