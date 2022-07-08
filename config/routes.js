const express = require("express");
const controllers = require("../app/controllers");
const {requireAuth} = require("../app/middleware/authMiddleware");
const uploadOnMemory = require("../app/middleware/uploadOnMemory");
const apiRouter = express.Router();

/**
 * Authentication Resource
 * */
apiRouter.get("/", controllers.api.v1.homeController.home);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/updatefotouser", uploadOnMemory.single("picture"), controllers.api.v1.authController.uploadFotoUser);
apiRouter.post("/api/v1/reupdatefotouser", uploadOnMemory.single("picture"), controllers.api.v1.authController.uploadReFotoUser);
apiRouter.post("/api/v1/updateinfo/:id", controllers.api.v1.authController.updateInfoUser);
apiRouter.get("/api/v1/getuser/:id",requireAuth,controllers.api.v1.authController.getUserData);

apiRouter.post("/api/v1/createproduk", controllers.api.v1.produkController.createProduk);
apiRouter.get("/api/v1/getallproduk", controllers.api.v1.produkController.getAllProduk);//untuk dihalaman utama
apiRouter.get("/api/v1/getproduk/:id", controllers.api.v1.produkController.getProdukById);//untuk per klik card produk dari hal utama/hasilpencarian
apiRouter.get("/api/v1/getprodukdijual/:penjualid", controllers.api.v1.produkController.getProdukDijual);//untuk produk yang dijual oleh user
apiRouter.post("/api/v1/updateproduk/:id", controllers.api.v1.produkController.updateProduk);
apiRouter.delete("/api/v1/deleteproduk/:id", controllers.api.v1.produkController.deleteProduk);
apiRouter.get("/api/v1/gethistoryseller/:penjualid", controllers.api.v1.produkController.getHistorySeller);//untuk arsip produk yang dihapus oleh user sebagai penjual
apiRouter.get("/api/v1/gethistorybuyer/:pembeliid", controllers.api.v1.produkController.getHistoryBuyer);//untuk arsip produk yang dihapus oleh user sebagai penjual
apiRouter.post("/api/v1/bataltransaksi/:id", controllers.api.v1.produkController.batalTranksaksi);

apiRouter.post("/api/v1/fotoproduksatu", uploadOnMemory.single("picture"), controllers.api.v1.produkController.uploadFotoProdukSatu);
apiRouter.post("/api/v1/refotoproduksatu", uploadOnMemory.single("picture"), controllers.api.v1.produkController.uploadReFotoProdukSatu);

apiRouter.post("/api/v1/createpenawaran", controllers.api.v1.penawaranController.createPenawaran);
apiRouter.get("/api/v1/getdiminati/:idseller", controllers.api.v1.penawaranController.listProdukDiminati);
apiRouter.get("/api/v1/getpenawaran/:idproduk", controllers.api.v1.penawaranController.listPenawaran);
apiRouter.get("/api/v1/gettotalpenawaran/:idseller", controllers.api.v1.penawaranController.totalListPenawaran);
apiRouter.get("/api/v1/getpenawaranbyid/:idpenawaran", controllers.api.v1.penawaranController.listPenawaranById);
apiRouter.post("/api/v1/updatepenawaran/:idpenawaran", controllers.api.v1.penawaranController.updatePenawaran);

apiRouter.get("/api/v1/getresponpenawaran/:idbuyer", controllers.api.v1.penawaranController.responPenawaran);
apiRouter.get("/api/v1/gettotalresponpenawaran/:idbuyer", controllers.api.v1.penawaranController.totalResponPenawaran);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
