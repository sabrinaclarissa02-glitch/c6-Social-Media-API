const errorTypes = {
  BAD_REQUEST: { status: 400, code: 'BAD_REQUEST_ERROR', description: 'Bad request' },
  VALIDATION: { status: 400, code: 'VALIDATION_ERROR', description: 'Validation error' },
  UNAUTHORIZED: { status: 401, code: 'UNAUTHORIZED_ERROR', description: 'Unauthorized' },
  FORBIDDEN: { status: 403, code: 'FORBIDDEN_ERROR', description: 'Forbidden' },
  NOT_FOUND: { status: 404, code: 'NOT_FOUND_ERROR', description: 'Resource not found' },
  ROUTE_NOT_FOUND: { status: 404, code: 'ROUTE_NOT_FOUND_ERROR', description: 'Route not found' },
  CONFLICT: { status: 409, code: 'CONFLICT_ERROR', description: 'Resource conflict' },
  DB_ERROR: { status: 500, code: 'DB_ERROR', description: 'Database error occurred' },
  SERVER_ERROR: { status: 500, code: 'SERVER_ERROR', description: 'Internal server error' },
};

function errorResponder(errorType, message = '') {
  const error = new Error(message || errorType.description);
  error.status = errorType.status || 500;
  error.code = errorType.code || 'UNKNOWN_ERROR';
  error.description = errorType.description || 'Unknown error';
  return error;
}

module.exports = { errorTypes, errorResponder };
