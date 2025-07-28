import NotFoundError from "../errors/notFoundError.js";
import clientes from "../models/clientes.js";
import paginate from "../middlewares/paginate.js";

class ClienteController {

  static listarClientes = async (req, res, next) => {
    try {
      const {limit, page, ...query} = req.query
      const listaClientes = await clientes.find(query);
      req.result = listaClientes;
      paginate(req, res, next, limit, page);
    } catch (error) {
      next(error);
    }
  }

  static buscarClientePorId = async (req, res, next) => {
    try {
      const cliente = await clientes.findById(req.params.id);
      if (!cliente) {
        next(new NotFoundError(`Cliente com id ${req.params.id} não encontrado.`));
      }
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  static registrarCliente = async (req, res, next) => {
    try{
      const novoCliente = new clientes(req.body);
      const resultadoInsercao = await novoCliente.save();

      res.status(201).json(resultadoInsercao.json())
    }catch(error){
      next(error);
    }
  }

  static atualizarCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      await clientes.findByIdAndUpdate(id, req.query);

      res.status(200).json({message: `Dados do cliente com id ${id} atualizados com sucesso.`})
    }catch(erro){
      next(erro);
    }
  }

  static deletarCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      await clientes.findByIdAndDelete(id);

      res.status(200).json({message: `Dados do cliente com id ${id} atualizados com sucesso.`})
    }catch(erro){
      next(erro);
    }
  }
}

export default ClienteController;