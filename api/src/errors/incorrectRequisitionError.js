import BaseError from "./baseError.js";

class IncorrectRequisitionError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

export default IncorrectRequisitionError;