import credenciais from "../models/credenciais.js";
import contas from "../models/contas.js";
import NotFoundError from "../errors/notFoundError.js";

const getPasswordHashPorNumeroConta = async (numeroConta) => {
  try {
    const contaId = await contas.findOne({ numeroConta: numeroConta });
    if (!contaId) {
      throw new NotFoundError(
        `Não existe conta de número ${numeroConta} cadastrada.`
      );
    }
    const credencial = await credenciais.findOne({ contaId: contaId });
    return credencial.senhaHash;
  } catch (erro) {
    console.error("Erro ao buscar credencial:", erro.message);
  }
};

export default getPasswordHashPorNumeroConta;
