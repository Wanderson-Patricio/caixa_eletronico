import IncorrectRequisitionError from "./incorrectRequisitionError.js";

class ValidationError extends IncorrectRequisitionError {
  constructor(err) {
    const errMsg = Object.values(err.errors)
      .map((err) => err.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errMsg}`);
  }
}

export default ValidationError;
