import express from "express";
import ContaController from "../controllers/contaController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router.get("/contas", ContaController.listarContas, paginate);
router.get("/contas/:id", ContaController.buscarContaPorId);
router.post("/contas", ContaController.registrarConta)
router.put("/contas/:id", ContaController.atualizarConta)
router.delete("/contas/:id", ContaController.deletarConta)

export default router;