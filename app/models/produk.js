'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Produk.init({
    namaproduk: DataTypes.STRING,
    hargaproduk: DataTypes.INTEGER,
    hargaterjual: DataTypes.INTEGER,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    statusproduk: DataTypes.STRING,
    foto1: DataTypes.TEXT,
    foto2: DataTypes.TEXT,
    foto3: DataTypes.TEXT,
    foto4: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Produk',
    paranoid: true,
  });
  return Produk;
};