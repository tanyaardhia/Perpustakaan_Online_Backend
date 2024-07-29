"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Loan, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exists",
        },
        validate: {
          notEmpty: {
            msg: "Email is Required",
          },
          notNull: {
            msg: "Email is Required",
          },
          isEmail: {
            args: true,
            msg: "Input must be Email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is Required",
          },
          notNull: {
            msg: "Password is Required",
          },
          len: {
            args: [8],
            msg: "Password must be at least 8 characters long",
          },
          isValidPassword(value) {
            const regex = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])[A-Za-z0-9]{8,}$/;
            if (!regex.test(value)) {
              throw new Error(
                "Password must be at least 8 characters long, contain only alphanumeric characters, and include at least one uppercase letter."
              );
            }
          },
        },
      },
      name: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "user" },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user, options) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
    user.role = "user";
  });

  return User;
};
