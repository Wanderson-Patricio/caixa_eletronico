import contas from "../models/contas.js";

const getNumeroConta = async (req, res, next) => {
  const todosOsNumerosContas = await contas.find(
    {},
    { _id: 0, numeroConta: 1 }
  );
  let maiorNumeroConta = todosOsNumerosContas.reduce((maior, conta) => {
    const numeroConta = Number.parseInt(conta.numeroConta.replace("-", ""));
    // Retorna o maior entre o valor atual e o número da conta.
    return Math.max(maior, numeroConta);
  }, 0);
  maiorNumeroConta++;

  const numStr = String(maiorNumeroConta).padStart(6, "0");
  const firstPart = numStr.substring(0, 5);
  const lastDigit = numStr.substring(5);

  return `${firstPart}-${lastDigit}`;
};

export default getNumeroConta;
