import NotFoundError from "../errors/notFoundError.js";
import credenciais from "../models/credenciais.js";
import paginate from "../middlewares/paginate.js";

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
      const id = req.params.id;
      const credencial = await credenciais.findById(id);
      if (!credencial) {
        next(new NotFoundError(`credencial com id ${id} não encontrado.`));
      } else {
        res.status(200).json(credencial);
      }
    } catch (error) {
      next(error);
    }
  };

  static registrarCredencial = async (req, res, next) => {
    try {
      const novoCredencial = new credenciais(req.body);
      const resultadoInsercao = await novoCredencial.save();

      res.status(201).json(resultadoInsercao.json());
    } catch (error) {
      next(error);
    }
  };

  static atualizarCredencial = async (req, res, next) => {
    try {
      const id = req.params.id;
      const credencialAtualizado = await credenciais.findByIdAndUpdate(id, req.query);
      if (!credencialAtualizado) {
        next(new NotFoundError(`credencial com id ${id} não encontrado.`));
      }

      res
        .status(200)
        .json({
          message: `Dados do credencial com id ${id} atualizados com sucesso.`,
        });
    } catch (erro) {
      next(erro);
    }
  };

  static deletarCredencial = async (req, res, next) => {
    try {
      const id = req.params.id;
      const credencialAtualizado = await credenciais.findByIdAndDelete(id, req.query);
      if (!credencialAtualizado) {
        next(new NotFoundError(`credencial com id ${id} não encontrado.`));
      }

      res
        .status(200)
        .json({
          message: `Dados do credencial com id ${id} atualizados com sucesso.`,
        });
    } catch (erro) {
      next(erro);
    }
  };
}

export default CredencialController;
