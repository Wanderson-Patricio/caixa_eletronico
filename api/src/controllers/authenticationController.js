import {
  generateToken,
  verifyToken,
} from "../middlewares/tokenAuthentication.js";
import generateHash from "../utils/generateHash.js";
import getPasswordHashPorNumeroConta from "../utils/getPasswordHashPorNumeroConta.js";
import contas from "../models/contas.js";
import clientes from "../models/clientes.js";

class AuthenticationController {
  static gerarToken = async (req, res, next) => {
    try {
      const { numeroConta, senha } = req.body;
      const senhaTentativa = generateHash(senha);
      const hashSenhaConta = await getPasswordHashPorNumeroConta(numeroConta);
      if (senhaTentativa !== hashSenhaConta) {
        next(new UnauthorizedError("/autenticar/token/gerar", 'Conta e/ou senha informadas incorretas.'));
      }

      const conta = await contas.findOne({ numeroConta: numeroConta });
      const cliente = await clientes.findById(conta.clienteId);

      const token = generateToken({
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
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthenticationController;
