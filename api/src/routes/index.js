import express from "express";
import clientes from "./clientesRoutes.js";
import contas from "./contasRoutes.js";
import credenciais from "./credenciaisRoutes.js";

const allRoutes = [clientes, contas, credenciais];

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "API - Caixa Eletrônico" });
  });

  app.use(express.json());
  for (const route of allRoutes) {
    app.use(route);
  }
};

export default routes;
