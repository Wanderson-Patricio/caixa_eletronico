import NotFoundError from "../errors/notFoundError.js";
import contas from "../models/contas.js";
import paginate from "../middlewares/paginate.js";

class ContaController {
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
      const id = req.params.id;
      const conta = await contas.findById(id);
      if (!conta) {
        next(new NotFoundError(`conta com id ${id} não encontrado.`));
      } else {
        res.status(200).json(conta);
      }
    } catch (error) {
      next(error);
    }
  };

  static registrarConta = async (req, res, next) => {
    try {
      const novoConta = new contas(req.body);
      const resultadoInsercao = await novoConta.save();

      res.status(201).json(resultadoInsercao.json());
    } catch (error) {
      next(error);
    }
  };

  static atualizarConta = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contaAtualizado = await contas.findByIdAndUpdate(id, req.query);
      if (!contaAtualizado) {
        next(new NotFoundError(`conta com id ${id} não encontrado.`));
      }

      res
        .status(200)
        .json({
          message: `Dados do conta com id ${id} atualizados com sucesso.`,
        });
    } catch (erro) {
      next(erro);
    }
  };

  static deletarConta = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contaAtualizado = await contas.findByIdAndDelete(id, req.query);
      if (!contaAtualizado) {
        next(new NotFoundError(`conta com id ${id} não encontrado.`));
      }

      res
        .status(200)
        .json({
          message: `Dados do conta com id ${id} atualizados com sucesso.`,
        });
    } catch (erro) {
      next(erro);
    }
  };
}

export default ContaController;
