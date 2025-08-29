import express from "express";
import ClienteController from "../controllers/clienteController.js";
import paginate from "../middlewares/paginate.js";
import { verifyToken } from "../middlewares/tokenAuthentication.js";

const router = express.Router();

// router.get("/clientes", ClienteController.listarClientes, paginate);
router.get("/clientes/:id", verifyToken, ClienteController.buscarClientePorId);
router.post("/clientes", ClienteController.registrarCliente)
router.put("/clientes/:id", verifyToken, ClienteController.atualizarCliente)
router.delete("/clientes/:id", verifyToken, ClienteController.deletarCliente)

export default router;