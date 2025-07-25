import NotFoundError from "../errors/notFoundError.js";

const manipulator404 = (req, res, next) => {
  next(new NotFoundError());
};

export default manipulator404;
