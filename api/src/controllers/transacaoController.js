import NotFoundError from "../errors/notFoundError.js";
import transacoes from "../models/transacoes.js";
import paginate from "../middlewares/paginate.js";

class TransacaoController {
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
      const id = req.params.id;
      const transacao = await transacoes.findById(id);
      if (!transacao) {
        next(new NotFoundError(`Transação com id ${id} não encontrado.`));
      } else {
        res.status(200).json(transacao);
      }
    } catch (error) {
      next(error);
    }
  };

  static registrarTransacao = async (req, res, next) => {
    try {
      const novoTransacao = new transacoes(req.body);
      const resultadoInsercao = await novoTransacao.save();

      res.status(201).json(resultadoInsercao.json());
    } catch (error) {
      next(error);
    }
  };

  static atualizarTransacao = async (req, res, next) => {
    try {
      const id = req.params.id;
      const TransacaoAtualizado = await transacoes.findByIdAndUpdate(id, req.query);
      if (!TransacaoAtualizado) {
        next(new NotFoundError(`Transacao com id ${id} não encontrado.`));
      }

      res
        .status(200)
        .json({
          message: `Dados do Transacao com id ${id} atualizados com sucesso.`,
        });
    } catch (erro) {
      next(erro);
    }
  };

  static deletarTransacao = async (req, res, next) => {
    try {
      const id = req.params.id;
      const TransacaoAtualizado = await transacoes.findByIdAndDelete(id, req.query);
      if (!TransacaoAtualizado) {
        next(new NotFoundError(`Transacao com id ${id} não encontrado.`));
      }

      res
        .status(200)
        .json({
          message: `Dados do Transacao com id ${id} atualizados com sucesso.`,
        });
    } catch (erro) {
      next(erro);
    }
  };
}

export default TransacaoController;
