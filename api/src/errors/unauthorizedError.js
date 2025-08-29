import BaseError from "./baseError.js";

class UnauthorizedError extends BaseError {
  constructor(path, message='') {
    super(`O usuário não possui acesso ao endpoint ${path}. Verifique a autenticação informada.` + message, 403);
  }
}

export default UnauthorizedError;
