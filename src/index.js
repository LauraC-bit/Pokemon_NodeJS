import express from "express";
import initRoutes from "./routes/routes.js";
import initMiddlewares from "./middlewares/init.middleware.js";

const app = express();
const PORT = 8000;

initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
