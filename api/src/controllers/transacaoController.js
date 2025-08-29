import NotFoundError from "../errors/notFoundError.js";
import transacoes from "../models/transacoes.js";
import paginate from "../middlewares/paginate.js";
import UnauthorizedError from "../errors/unauthorizedError.js";

import mongoose from "mongoose";

class TransacaoController {
  static verifyIdOrigem = async (idOrigem, req) => {
    const contaOrigemId = req.userData.info.conta._id;
    const transacao = await transacoes.findOne({
      _id: new mongoose.Types.ObjectId(idOrigem),
      contaOrigemId,
    });
    return Boolean(transacao);
  };

  static verifyIdDestino = async (idDestino, req) => {
    const contaDestinoId = req.userData.info.conta._id;
    const transacao = await transacoes.findOne({
      _id: new mongoose.Types.ObjectId(idDestino),
      contaDestinoId,
    });
    return Boolean(transacao);
  };

  static verifyId = async (intendedId, req) => {
    const verifyOrigem = await TransacaoController.verifyIdOrigem(
      intendedId,
      req
    );
    const verifyDestino = await TransacaoController.verifyIdDestino(
      intendedId,
      req
    );

    return verifyOrigem || verifyDestino;
  };

  static listarTransacoes = async (req, res, next) => {
    try {
      const { limit, page, ...query } = req.query;
      const listaTransacoes = await transacoes.find(query);
      req.result = listaTransacoes;
      paginate(req, res, next, limit, page);
    } catch (error) {
      next(error);
    }
  };

  static buscarTransacaoPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await TransacaoController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`GET /transacoes/${id}`));
      } else {
        const transacao = await transacoes.findById(id);
        if (!transacao) {
          next(new NotFoundError(`Transação com id ${id} não encontrado.`));
        } else {
          res.status(200).json(transacao);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  static registrarTransacao = async (req, res, next) => {
    try {
      const id = req.body.contaOrigemId;
      const verify = await TransacaoController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`GET /transacoes/${id}`));
      } else {
        const novoTransacao = new transacoes(req.body);
        const resultadoInsercao = await novoTransacao.save();

        res.status(201).json(resultadoInsercao.json());
      }
    } catch (error) {
      next(error);
    }
  };

  static atualizarTransacao = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await TransacaoController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`GET /transacoes/${id}`));
      } else {
        const TransacaoAtualizado = await transacoes.findByIdAndUpdate(
          id,
          req.body
        );
        if (!TransacaoAtualizado) {
          next(new NotFoundError(`Transacao com id ${id} não encontrado.`));
        }

        res.status(200).json({
          message: `Dados do Transacao com id ${id} atualizados com sucesso.`,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarTransacao = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = TransacaoController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`GET /transacoes/${id}`));
      } else {
        const TransacaoAtualizado = await transacoes.findByIdAndDelete(
          id,
          req.body
        );
        if (!TransacaoAtualizado) {
          next(new NotFoundError(`Transacao com id ${id} não encontrado.`));
        }

        res.status(200).json({
          message: `Dados do Transacao com id ${id} atualizados com sucesso.`,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default TransacaoController;
