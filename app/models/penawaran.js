'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penawaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Penawaran.belongsTo(models.Produk, {foreignKey: 'idproduk', as: 'produk'});
    }
  }
  Penawaran.init({
    idbuyer: DataTypes.INTEGER,
    idproduk: DataTypes.INTEGER,
    namaproduk: DataTypes.STRING,
    hargaproduk: DataTypes.INTEGER,
    idseller: DataTypes.INTEGER,
    hargatawar: DataTypes.INTEGER,
    statustawar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penawaran',
  });
  return Penawaran;
};