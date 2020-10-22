'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bcrypt = require("bcryptjs")
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync("admin", salt)

    const data = [
      {
        first_name: "reggi",
        last_name: "samudra",
        email: "reggisamudra@email.com",
        password: hash,
        role: "gm",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert("Users", data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {})

  }
};
