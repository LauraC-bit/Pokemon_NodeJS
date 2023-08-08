import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const initUserRoutes = (app, sm, jwt) => {
  const router = Router();
  router.get("/get-all", jwt, sm, UserController.getAll);
  router.post("/login", sm, UserController.login);
  router.post("/create", sm, (req, res) => {});

  app.use("/user", router);
};

export default initUserRoutes;
