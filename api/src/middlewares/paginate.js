const paginate = async (req, res, next) => {
  try {
    let { limit = 5, page = 1 } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const result = req.result;

    if (page > 0 && limit > 0) {
      const paginatedResult = result.slice((page-1) * limit, page * limit + 1)

      res.status(200).json(paginatedResult);
    } else {
      next(
        new IncorrectRequisitionError(
          "A página e o limite devem ser inteiros positivos."
        )
      );
    }
  } catch (err) {
    next(err);
  }
};

export default paginate;
