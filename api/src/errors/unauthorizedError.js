import BaseError from "./baseError.js";

class UnauthorizedError extends BaseError {
  constructor(path) {
    super(`O usuário não possui acesso ao endpoint ${path}. Verifique a autenticação informada.`, 403);
  }
}

export default UnauthorizedError;
