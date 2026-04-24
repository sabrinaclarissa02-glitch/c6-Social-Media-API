const express = require('express');
const cors = require('cors');

const routes = require('./api/routes');
const { notFoundHandler, errorHandler } = require('./core/error-middleware');
const { connectDatabase, startServer } = require('./core/server');
const logger = require('./core/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is running' });
});

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

async function bootstrap() {
  try {
    await connectDatabase();
    startServer(app);
  } catch (error) {
    logger.error('Failed to start application:', error.message);
    process.exit(1);
  }
}

if (require.main === module) bootstrap();

module.exports = app;
