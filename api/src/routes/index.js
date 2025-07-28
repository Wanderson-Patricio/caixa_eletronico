import express from "express";
import clientes from "./clientesRoutes.js";

const allRoutes = [clientes];

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
