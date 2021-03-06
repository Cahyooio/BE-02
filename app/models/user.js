"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      User.hasMany(models.Produk, {foreignKey: 'id', as: 'produk'});
      User.hasMany(models.Penawaran,{foreignKey:'id',as:'pembeli'})
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      alamat: DataTypes.STRING,
      nohp: DataTypes.STRING,
      kota: DataTypes.STRING,
      profilimg: DataTypes.TEXT,
      namaprofilimg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
