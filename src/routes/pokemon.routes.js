import { Router } from "express";
import { pokemonsController } from "../controllers/pokemons.controller.js";

const initPokemonRoutes = (app, sm, jwt) => {
  const router = Router();
  router.get("/get-all", jwt, sm, pokemonsController.getAll);
  router.post("/create", jwt, sm, pokemonsController.create);
  router.patch("/update", jwt, sm, pokemonsController.update);
  router.delete("/delete/:PokemonId", jwt, sm, pokemonsController.deleteT);

  app.use("/pokemon", router);
};

export default initPokemonRoutes;
