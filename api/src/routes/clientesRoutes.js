import express from "express";
import ClienteController from "../controllers/clienteController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

// router.get("/clientes", ClienteController.listarClientes, paginate);
router.get("/clientes/:id", ClienteController.buscarClientePorId);
router.post("/clientes", ClienteController.registrarCliente)
router.put("/clientes/:id", ClienteController.atualizarCliente)
router.delete("/clientes/:id", ClienteController.deletarCliente)

export default router;