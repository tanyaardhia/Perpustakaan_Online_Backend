const { where } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Loan, Book } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log("masuk registerrr");

      const newUser = await User.create({ name, email, password });
      res.status(201).json({
        message: "User registered successfully",
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("masuk login");

      if (!email) {
        throw { code: 400, message: "Email is required" };
      }

      if (!password) {
        throw { code: 400, message: "Password is required" };
      }

      const dataLogin = await User.findOne({ where: { email } });
      if (!dataLogin) {
        throw { code: 401, message: "Invalid email or password" };
      }

      console.log("data login controller");

      const comparedPassword = comparePassword(password, dataLogin.password);
      if (!comparedPassword) {
        throw { code: 401, message: "Invalid email or password" };
      }

      const payload = { id: dataLogin.id };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      if (error.code !== undefined) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async loanBooks(req, res) {
    try {
      const { userId, bookId } = req.body;
      console.log(userId, ">> user id ||", bookId, ">> book id");
      console.log(">>>> masuk loan book");

      const dataUser = await User.findByPk(userId);
      if (!dataUser) {
        throw { code: 404, message: "User not found" };
      }

      const dataBook = await Book.findByPk(bookId);
      if (!dataBook) {
        throw { code: 404, message: "Book not found" };
      }

      if (dataBook.status !== "available") {
        throw { code: 400, message: "Book is not available" };
      }

      const existingLoanBook = await Loan.findOne({
        where: { userId, returned_date: null },
      });

      if (existingLoanBook) {
        throw { code: 400, message: "User already has an active loan" };
      }

      const newLoan = await Loan.create({
        userId,
        bookId,
        borrowed_date: new Date(),
        due_date: new Date(new Date().setDate(new Date().getDate() + 30)),
      });

      dataBook.status = "checked out";
      await dataBook.save({ Loan });

      res.status(201).json({
        message: "Book loaned successfully",
        loan_id: newLoan.id,
        borrowed_date: newLoan.borrowed_date,
        due_date: newLoan.due_date,
      });
    } catch (error) {
      console.log(error);
      if (error.code !== undefined) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async overdueBooks(req, res) {
    try {
      const today = new Date();
      const overdueLoans = await Loan.findAll({
        where: {
          due_date: {
            [Op.lt]: today,
          },
          returned_date: null,
        },
        include: [
          { model: User, attributes: ["id", "email", "name"] },
          { model: Book, attributes: ["id", "title", "author"] },
        ],
      });

      console.log(overdueLoans, "<<<");
      res.status(200).json({
        message: "Overdue loans retrieved successfully",
        data: overdueLoans,
      });
    } catch (error) {
      console.log(error);
      if (error.code !== undefined) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = Controller;
