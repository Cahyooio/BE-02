const express = require("express");
const controllers = require("../app/controllers");
const {requireAuth, checkUser} = require ("../app/middleware/authMiddleware");
const uploadOnMemory = require("../app/middleware/uploadOnMemory");
const apiRouter = express.Router();

/**
 * Authentication Resource
 * */
apiRouter.get('/api/v1/user',controllers.api.v1.userController.getUser);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.get("/api/v1/logout", controllers.api.v1.authController.logout);
apiRouter.post("/api/v1/updatefotouser", uploadOnMemory.single("picture"), controllers.api.v1.authController.uploadFotoUser);
apiRouter.post("/api/v1/updateinfo/:id", controllers.api.v1.authController.updateInfoUser);

apiRouter.post("/api/v1/createproduk", controllers.api.v1.produkController.createProduk);
apiRouter.get("/api/v1/getallproduk", controllers.api.v1.produkController.getAllProduk);
apiRouter.get("/api/v1/getproduk/:id", controllers.api.v1.produkController.getProdukById);
apiRouter.post("/api/v1/updateproduk/:id", controllers.api.v1.produkController.updateProduk);
apiRouter.delete("/api/v1/deleteproduk/:id", controllers.api.v1.produkController.deleteProduk);


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
