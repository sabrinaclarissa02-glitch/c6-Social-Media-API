const { errorTypes } = require('./errors');

function notFoundHandler(req, res, next) {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = errorTypes.ROUTE_NOT_FOUND.status;
  error.code = errorTypes.ROUTE_NOT_FOUND.code;
  error.description = errorTypes.ROUTE_NOT_FOUND.description;

  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  const errorCode = err.code || 'UNKNOWN_ERROR';
  const description = err.description || 'Unknown error';
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    statusCode,
    error: errorCode,
    description,
    message,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};