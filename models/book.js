"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Loan, {
        foreignKey: "bookId",
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      published_date: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
        defaultValue: "available",
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
