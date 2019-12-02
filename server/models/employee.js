'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  },
  {
  indexes: [
      {
        unique: false,
        fields:['name']
      }
  ]
  });
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Department, {
        foreignKey: 'departmentID',
        onDelete: 'CASCADE'
    });
  };
  sequelizePaginate.paginate(Employee);
  return Employee;
};