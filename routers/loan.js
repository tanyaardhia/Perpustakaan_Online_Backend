const express = require("express");
const Controller = require("../controllers/controller");
const loan = express.Router();

loan.post("/loan-book", Controller.loanBooks);
loan.get("/overdue-books", Controller.overdueBooks);

module.exports = loan;
