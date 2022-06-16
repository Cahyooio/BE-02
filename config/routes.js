const express = require("express");
const controllers = require("../app/controllers");
const {requireAuth, checkUser} = require ("../app/middleware/authMiddleware");

const apiRouter = express.Router();

/**
 * Authentication Resource
 * */
apiRouter.get('/api/v1/user',controllers.api.v1.userController.getUser);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.get("/api/v1/logout", controllers.api.v1.authController.logout);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
