import express from "express";
import TransacaoController from "../controllers/transacaoController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

// router.get("/transacoes", TransacaoController.listarTransacoes, paginate);
router.get("/transacoes/:id", TransacaoController.buscarTransacaoPorId);
router.post("/transacoes", TransacaoController.registrarTransacao)
router.put("/transacoes/:id", TransacaoController.atualizarTransacao)
router.delete("/transacoes/:id", TransacaoController.deletarTransacao)

export default router;