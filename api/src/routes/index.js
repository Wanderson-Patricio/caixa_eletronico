import express from "express";
import clientes from "./clientesRoutes.js";
import contas from "./contasRoutes.js";
import credenciais from "./credenciaisRoutes.js";
import transacoes from "./transacoesRoutes.js";
import autenticacao from "./authenticationRoutes.js"

const allRoutes = [clientes, contas, credenciais, transacoes, autenticacao];

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ 
      title: "API - Caixa Eletrônico",
      version: "1.0.0",
      author: "Wanderson Faustino Patricio"
    });
  });

  app.use(express.json());
  for (const route of allRoutes) {
    app.use(route);
  }
};

export default routes;
