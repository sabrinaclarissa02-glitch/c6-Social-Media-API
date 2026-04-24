const { errorTypes } = require('./errors');

function notFoundHandler(req, res, next) {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = errorTypes.ROUTE_NOT_FOUND.status;
  error.code = errorTypes.ROUTE_NOT_FOUND.code;
  error.description = errorTypes.ROUTE_NOT_FOUND.description;
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    status: 'fail',
    statusCode,
    error: err.code || 'UNKNOWN_ERROR',
    description: err.description || 'Unknown error',
    message: err.message || 'Something went wrong',
  });
}

module.exports = { notFoundHandler, errorHandler };
