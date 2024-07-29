const express = require("express");
const Controller = require("../controllers/controller");
const loan = express.Router();

loan.post("/loan-book", Controller.loanBook);

module.exports = loan;

