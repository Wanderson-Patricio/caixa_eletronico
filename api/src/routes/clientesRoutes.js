import express from "express";
import ClienteController from "../controllers/clienteController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router.get("/clientes", ClienteController.listarClientes, paginate);
router.get("/clientes/:id", ClienteController.buscarClientePorId);

export default router;