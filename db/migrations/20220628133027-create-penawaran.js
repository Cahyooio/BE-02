'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penawarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idbuyer: {
        type: Sequelize.INTEGER
      },
      idproduk: {
        type: Sequelize.INTEGER
      },
      namaproduk: {
        type: Sequelize.STRING
      },
      hargaproduk: {
        type: Sequelize.INTEGER
      },
      idseller: {
        type: Sequelize.INTEGER
      },
      hargatawar: {
        type: Sequelize.INTEGER
      },
      statustawar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Penawarans');
  }
};