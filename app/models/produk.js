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
      Produk.hasMany(models.Penawaran, {foreignKey: 'idproduk', as: 'produk'});
    }
  }
  Produk.init({
    namaproduk: DataTypes.STRING,
    hargaproduk: DataTypes.INTEGER,
    hargaterjual: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    statusproduk: DataTypes.STRING,
    foto1: DataTypes.TEXT,
    namafoto1: DataTypes.STRING,
    foto2: DataTypes.TEXT,
    namafoto2: DataTypes.STRING,
    foto3: DataTypes.TEXT,
    namafoto3: DataTypes.STRING,
    foto4: DataTypes.TEXT,
    namafoto4: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produk',
    paranoid: true,
  });
  return Produk;
};