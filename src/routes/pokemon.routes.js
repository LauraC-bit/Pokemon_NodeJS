import { Router } from "express";
import { pokemonsController } from "../controllers/pokemons.controller.js";

const initPokemonRoutes = (app) => {
  const router = Router();
  router.get("/get-all", pokemonsController.getAll);
  router.post("/create", pokemonsController.create);

  app.use("/pokemon", router);
};

export default initPokemonRoutes;
