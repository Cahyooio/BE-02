/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const authController = require("./authController");
const produkController = require("./produkController");
const userController = require("./userController");
module.exports = {
  authController,
  produkController,
  userController,
};
