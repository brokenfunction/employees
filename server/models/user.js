'use strict';

const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [0,50]
    },
    password: {
        type: DataTypes.STRING,
        len: [0,18]
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'It is not an email address.'
            }
        }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.validPassword = async function(password) {
      return await bcrypt.compare(password, this.password);
  };

  User.beforeCreate(async (user, options) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};