import express from "express";
import AuthenticationController from "../controllers/authenticationController.js";

const router = express.Router();

router.get("/autenticar/token/gerar", AuthenticationController.gerarToken);

export default router;
