const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

async function connectDatabase() {
  if (process.env.SKIP_DB === 'true' || !config.dbConnection) {
    logger.warn('Database connection skipped.');
    return;
  }

  await mongoose.connect(config.dbConnection, {
    dbName: config.dbName || undefined,
    serverSelectionTimeoutMS: 15000,
  });

  logger.info(`MongoDB connected${config.dbName ? ` to ${config.dbName}` : ''}`);
}

function startServer(app) {
  return app.listen(config.port, () => {
    logger.info(`Server runs at port ${config.port}`);
  });
}

module.exports = { connectDatabase, startServer };
