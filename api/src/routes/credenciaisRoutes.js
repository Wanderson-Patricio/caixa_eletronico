import express from "express";
import CredencialController from "../controllers/credencialController.js";
import paginate from "../middlewares/paginate.js";
import { verifyToken } from "../middlewares/tokenAuthentication.js";

const router = express.Router();

router.get("/credenciais", CredencialController.listarCredenciais, paginate);
router.get("/credenciais/verificar",verifyToken, CredencialController.verificarCredencial);
router.get("/credenciais/gerar", CredencialController.gerarToken);
router.get("/credenciais/:id", CredencialController.buscarCredencialPorId);
router.post("/credenciais", CredencialController.registrarCredencial);
router.put("/credenciais/:id", CredencialController.atualizarCredencial);
router.delete("/credenciais/:id", CredencialController.deletarCredencial);

export default router;
