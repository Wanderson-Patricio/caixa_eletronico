import express from "express";
import TransacaoController from "../controllers/transacaoController.js";
import paginate from "../middlewares/paginate.js";
import { verifyToken } from "../middlewares/tokenAuthentication.js";

const router = express.Router();

// router.get("/transacoes", TransacaoController.listarTransacoes, paginate);
router.get("/transacoes/:id", verifyToken, TransacaoController.buscarTransacaoPorId);
router.post("/transacoes", verifyToken, TransacaoController.registrarTransacao)
router.put("/transacoes/:id", verifyToken, TransacaoController.atualizarTransacao)
router.delete("/transacoes/:id", verifyToken, TransacaoController.deletarTransacao)

export default router;