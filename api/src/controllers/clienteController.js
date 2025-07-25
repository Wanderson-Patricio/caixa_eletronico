import NotFoundError from "../errors/notFoundError.js";
import clientes from "../models/clientes.js";
import paginate from "../middlewares/paginate.js";

class ClienteController {

  static listarClientes = async (req, res, next) => {
    try {
      const listaClientes = await clientes.find(req.query);
      req.result = listaClientes;
      paginate(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  static buscarClientePorId = async (req, res, next) => {
    try {
      const cliente = await clientes.findById(req.params.id);
      if (!cliente) {
        res.status(200).json({erro: `Cliente com ID ${req.params.id} não encontrado`});
      }
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }
}

export default ClienteController;