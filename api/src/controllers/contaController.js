import NotFoundError from "../errors/notFoundError.js";
import UnauthorizedError from "../errors/unauthorizedError.js";
import contas from "../models/contas.js";
import paginate from "../middlewares/paginate.js";
import getNumeroConta from "../utils/getNumeroConta.js";

import mongoose from "mongoose";

class ContaController {
  static verifyId = async (intendedId, req) => {
    const numeroConta = req.userData.info.conta.numeroConta;
    const conta = await contas.findOne({
      numeroConta: numeroConta,
    });
    if (!conta) {
      return false;
    }

    return conta._id.equals(new mongoose.Types.ObjectId(intendedId));
  };

  static listarContas = async (req, res, next) => {
    try {
      const { limit, page, ...query } = req.query;
      const listaContas = await contas.find(query);
      req.result = listaContas;
      paginate(req, res, next, limit, page);
    } catch (error) {
      next(error);
    }
  };

  static buscarContaPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await ContaController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`GET /contas/${id}`));
      } else {
        const conta = await contas.findById(id);
        if (!conta) {
          next(new NotFoundError(`conta com id ${id} não encontrado.`));
        } else {
          res.status(200).json(conta);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  static registrarConta = async (req, res, next) => {
    try {
      const { clienteId, tipoConta } = req.body;
      const numeroConta = await getNumeroConta();
      const dados = {
        clienteId: new mongoose.Types.ObjectId(clienteId),
        numeroConta,
        tipoConta,
        saldo: 0,
        ativa: true,
      };
      console.table(dados);
      const novoConta = new contas(dados);
      const resultadoInsercao = await novoConta.save();

      res.status(201).json(resultadoInsercao);
    } catch (error) {
      next(error);
    }
  };

  static atualizarConta = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await ContaController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`PUT /contas/${id}`));
      } else {
        const contaAtualizado = await contas.findByIdAndUpdate(id, req.body);
        if (!contaAtualizado) {
          next(new NotFoundError(`conta com id ${id} não encontrado.`));
        }

        res.status(200).json({
          message: `Dados do conta com id ${id} atualizados com sucesso.`,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarConta = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await ContaController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`DELETE /contas/${id}`));
      } else {
        const contaAtualizado = await contas.findByIdAndDelete(id);
        if (!contaAtualizado) {
          next(new NotFoundError(`conta com id ${id} não encontrado.`));
        }

        res.status(200).json({
          message: `Dados do conta com id ${id} atualizados com sucesso.`,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default ContaController;
