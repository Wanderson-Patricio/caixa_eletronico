import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import IncorrectRequisitionError from "../errors/incorrectRequisitionError.js";
import ValidationError from "../errors/validationError.js";

const errorManipulator = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    new IncorrectRequisitionError(
      "Um ou mais dados fornecidos estão incorretos"
    ).sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof BaseError) {
    err.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};

export default errorManipulator;
