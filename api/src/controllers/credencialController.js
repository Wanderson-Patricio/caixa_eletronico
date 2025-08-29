import NotFoundError from "../errors/notFoundError.js";
import UnauthorizedError from "../errors/unauthorizedError.js";
import credenciais from "../models/credenciais.js";
import contas from "../models/contas.js";
import paginate from "../middlewares/paginate.js";
import generateHash from "../utils/generateHash.js";

import mongoose from "mongoose";

class CredencialController {
  static verifyId = async (intendedId, req) => {
    const numeroConta = req.userData.info.conta.numeroConta;
    const conta = await contas.findOne({ numeroConta: numeroConta });
    if (!conta) {
      return false;
    }

    const credencial = await credenciais.findById(intendedId);
    if (!credencial) {
      return false;
    }

    return conta._id.equals(credencial.contaId);
  };

  static listarCredenciais = async (req, res, next) => {
    try {
      const { limit, page, ...query } = req.query;
      const listaCredencials = await credenciais.find(query);
      req.result = listaCredencials;
      paginate(req, res, next, limit, page);
    } catch (error) {
      next(error);
    }
  };

  static buscarCredencialPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await CredencialController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`GET /credenciais/${id}`));
      } else {
        const credencial = await credenciais.findById(id);
        if (!credencial) {
          next(new NotFoundError(`credencial com id ${id} não encontrado.`));
        } else {
          res.status(200).json(credencial);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  static registrarCredencial = async (req, res, next) => {
    try {
      const { contaId, senha } = req.body;
      const dados = {
        contaId: new mongoose.Types.ObjectId(contaId),
        senhaHash: generateHash(senha),
        tentativasFalhas: 0,
        ultimoLogin: Date.now().toString(),
      };

      const novoCredencial = new credenciais(dados);
      const resultadoInsercao = await novoCredencial.save();

      res.status(201).json(resultadoInsercao);
    } catch (error) {
      next(error);
    }
  };

  static atualizarCredencial = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await CredencialController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`PUT /credenciais/${id}`));
      } else {
        const credencialAtualizado = await credenciais.findByIdAndUpdate(
          id,
          req.body
        );
        if (!credencialAtualizado) {
          next(new NotFoundError(`credencial com id ${id} não encontrado.`));
        }

        res.status(200).json({
          message: `Dados do credencial com id ${id} atualizados com sucesso.`,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarCredencial = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await CredencialController.verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`DELETE /credenciais/${id}`));
      } else {
        const credencialDeletada = await credenciais.findByIdAndDelete(id);
        if (!credencialDeletada) {
          next(new NotFoundError(`credencial com id ${id} não encontrado.`));
        } else {
          res.status(200).json({
            message: `credencial com id ${id} deletada com sucesso.`,
          });
        }
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default CredencialController;
