"use strict";
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let dataUser = JSON.parse(fs.readFileSync("./data/user.json", "utf-8")).map(
      (item) => {
        item.createdAt = new Date();
        item.updatedAt = new Date();
        item.password = hashPassword(item.password)
        item.role = "user"
        return item;
      }
    );
    await queryInterface.bulkInsert("Users", dataUser);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});

  },
};
