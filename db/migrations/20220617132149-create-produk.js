'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaproduk: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hargaproduk: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hargaterjual: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      idseller: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      kategori: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      foto1: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      namafoto1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      foto2: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      namafoto2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      foto3: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      namafoto3: {
        allowNull: true,
        type: Sequelize.STRING
      },
      foto4: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      namafoto4: {
        allowNull: true,
        type: Sequelize.STRING
      },
      statusproduk: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idbuyer: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produks');
  }
};