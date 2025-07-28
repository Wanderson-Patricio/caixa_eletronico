const validateDigit = (index) => {
  if(![0, 1].includes(index)){
    throw Error("Índice não compatível com a verificação de cpf.")
  }

  const start = (index === 0) ? 8 : 9;
  const wrapper = (cpf) => {
    const numberArray = cpf.split("").map(Number);
    let soma = 0;


    for (let i = start, factor = 2; i >= 0; i--, factor++) {
      soma += numberArray[i] * factor;
    }

    const resto = soma % 11;
    const digit = resto < 2 ? 0 : 11 - resto;

    return digit == Number.parseInt(cpf.charAt(start + 1));
  }

  return wrapper;
};

const validateFirstDigit = validateDigit(0);
const validateSecondDigit = validateDigit(1)

const validateCPF = (cpf) => {
  if (typeof cpf !== "string") {
    return false; // Deve ser uma string
  }

  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, "");

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Evita CPFs com todos os dígitos iguais (ex: "111.111.111-11")
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  if(!validateFirstDigit(cpf)){
    return false
  }

  return validateSecondDigit(cpf)
};

export default validateCPF;
