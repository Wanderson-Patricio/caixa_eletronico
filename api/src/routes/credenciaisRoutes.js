import express from "express";
import CredencialController from "../controllers/credencialController.js";
import paginate from "../middlewares/paginate.js";
import { verifyToken } from "../middlewares/tokenAuthentication.js";

const router = express.Router();

// router.get("/credenciais", verifyToken, CredencialController.listarCredenciais, paginate);
router.get("/credenciais/:id", verifyToken, CredencialController.buscarCredencialPorId);
router.post("/credenciais", CredencialController.registrarCredencial);
router.put("/credenciais/:id", verifyToken, CredencialController.atualizarCredencial);
router.delete("/credenciais/:id", verifyToken, CredencialController.deletarCredencial);

export default router;
