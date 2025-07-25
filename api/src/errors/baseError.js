class BaseError extends Error {
  constructor(message = "Erro interno do Servidor", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendResponse(res) {
    res.status(this.status).json({
      message: this.message,
      status: this.status,
    });
  }
}

export default BaseError;
