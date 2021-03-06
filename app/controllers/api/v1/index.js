/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const authController = require("./authController");
const produkController = require("./produkController");
const penawaranController = require("./penawaranController");
const homeController = require("./homeController");
const kategoriController = require("./kategoriController");

module.exports = {
  authController,
  produkController,
  penawaranController,
  homeController,
  kategoriController
};
