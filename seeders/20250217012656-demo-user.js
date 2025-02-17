'use strict';

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
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Rafli Kurniawan',
        email: 'rafli@gmail.com',
        password: 'asdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asa Marsal',
        email: 'asamarsal@gmail.com',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rizal Khudori',
        email: 'rizalk@gmail.com',
        password: '1111',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
