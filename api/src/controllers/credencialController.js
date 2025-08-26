import NotFoundError from "../errors/notFoundError.js";
import UnauthorizedError from "../errors/unauthorizedError.js";
import credenciais from "../models/credenciais.js";
import contas from "../models/contas.js";
import clientes from "../models/clientes.js";
import paginate from "../middlewares/paginate.js";
import generateHash from "../utils/generateHash.js";
import getPasswordHashPorNumeroConta from "../utils/getPasswordHashPorNumeroConta.js";
import { generateToken } from "../middlewares/tokenAuthentication.js";

import mongoose from "mongoose";

const verifyId = async (intendedId, req) => {
  const conta = await contas.findOne({ numeroConta: req.userData.numeroConta });
  if (!conta) {
    return false;
  }

  const credencial = await credenciais.findById(intendedId);
  if (!credencial) {
    return false;
  }

  return conta._id.equals(credencial.contaId);
};

class CredencialController {
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
      const verify = await verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError(`/credenciais/${id}`));
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
        ultimoLogin: Date.now().toString()
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
      const verify = await verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError("/credenciais"));
      } else {
        const credencialAtualizado = await credenciais.findByIdAndUpdate(
          id,
          req.body
        );
        if (!credencialAtualizado) {
          next(new NotFoundError(`credencial com id ${id} não encontrado.`));
        }

        res.status(200).json({
          message: `Dados do credencial com id ${id} atualizados com sucesso.`
        });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarCredencial = async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await verifyId(id, req);
      if (!verify) {
        next(new UnauthorizedError("/credenciais"));
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

  static gerarToken = async (req, res, next) => {
    try {
      res.status(200).json({ token: generateToken(req.body) });
    } catch (erro) {
      next(erro);
    }
  };

  static verificarCredencial = async (req, res, next) => {
    try {
      const { numeroConta } = req.userData;
      const { senha } = req.body;
      const tryPasswordHash = generateHash(senha);
      const passwordHash = await getPasswordHashPorNumeroConta(numeroConta);
      if (tryPasswordHash !== passwordHash) {
        throw new UnauthorizedError("/credenciais/verificar");
      }

      const conta = await contas.findOne({ numeroConta: numeroConta });
      const cliente = await clientes.findById(conta.clienteId);

      res.status(200).json({
        info: {
          conta: {
            _id: conta._id,
            numeroConta: numeroConta,
            tipoConta: conta.tipoConta,
          },
          cliente: {
            _id: cliente._id,
            nome: cliente.nome,
          },
        },
        acesso: {
          datetime: Date.now(),
        },
      });
    } catch (erro) {
      next(erro);
    }
  };
}

export default CredencialController;
