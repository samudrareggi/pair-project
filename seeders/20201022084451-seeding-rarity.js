'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        name: "Uncommon",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Common",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rare",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Epic",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Legendary",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert("Rarities", data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Rarities", null, {})
  }
};
