'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.User, { foreignKey: 'userId' });
      Loan.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Loan.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    borrowed_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    returned_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};