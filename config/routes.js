const express = require("express");
const controllers = require("../app/controllers");
const uploadOnMemory = require("../app/middleware/uploadOnMemory");
const apiRouter = express.Router();

/**
 * Authentication Resource
 * */
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/updatefotouser", uploadOnMemory.single("picture"), controllers.api.v1.authController.uploadFotoUser);
apiRouter.post("/api/v1/reupdatefotouser", uploadOnMemory.single("picture"), controllers.api.v1.authController.uploadReFotoUser);
apiRouter.post("/api/v1/updateinfo/:id", controllers.api.v1.authController.updateInfoUser);

apiRouter.post("/api/v1/createproduk", controllers.api.v1.produkController.createProduk);
apiRouter.get("/api/v1/getallproduk", controllers.api.v1.produkController.getAllProduk);//untuk dihalaman utama
apiRouter.get("/api/v1/getproduk/:id", controllers.api.v1.produkController.getProdukById);//untuk per klik card produk dari hal utama/hasilpencarian
apiRouter.get("/api/v1/getprodukdijual/:penjualid", controllers.api.v1.produkController.getProdukDijual);//untuk produk yang dijual oleh user
apiRouter.post("/api/v1/updateproduk/:id", controllers.api.v1.produkController.updateProduk);
apiRouter.delete("/api/v1/deleteproduk/:id", controllers.api.v1.produkController.deleteProduk);
apiRouter.get("/api/v1/getallarsip/:penjualid", controllers.api.v1.produkController.lihatArsip);//untuk arsip produk yang dihapus oleh user sebagai penjual

apiRouter.post("/api/v1/fotoproduksatu", uploadOnMemory.single("picture"), controllers.api.v1.produkController.uploadFotoProdukSatu);
apiRouter.post("/api/v1/refotoproduksatu", uploadOnMemory.single("picture"), controllers.api.v1.produkController.uploadReFotoProdukSatu);


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
