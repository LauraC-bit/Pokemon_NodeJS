import initPokemonRoutes from "./pokemon.routes.js";
import initUserRoutes from "./user.routes.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.middleware.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initRoutes = (app) => {
  initPokemonRoutes(app, sanitizeMiddleware, jwtMiddleware);
  initUserRoutes(app, sanitizeMiddleware, jwtMiddleware);
};

export default initRoutes;
