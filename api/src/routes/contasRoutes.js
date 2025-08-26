import express from "express";
import ContaController from "../controllers/contaController.js";
import paginate from "../middlewares/paginate.js";
import { verifyToken } from "../middlewares/tokenAuthentication.js";

const router = express.Router();

// router.get("/contas", verifyToken, ContaController.listarContas, paginate);
router.get("/contas/:id", verifyToken, ContaController.buscarContaPorId);
router.post("/contas", ContaController.registrarConta)
router.put("/contas/:id", verifyToken, ContaController.atualizarConta)
router.delete("/contas/:id", verifyToken, ContaController.deletarConta)

export default router;