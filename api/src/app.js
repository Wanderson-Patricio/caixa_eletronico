import express from "express";
import cors from "cors"
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorManipulator from "./middlewares/errorManipulator.js";
import manipulator404 from "./middlewares/manipulator404.js";

db.on(
  "error",
  console.log.bind(console, "Erro de conexão com o banco de dados.")
);

const app = express();
app.use(cors());
app.use(express.json());
routes(app);


app.use(manipulator404);
app.use(errorManipulator);

export default app;
