const express = require('express');
const cors = require('cors');

const routes = require('./api/routes');
const { notFoundHandler, errorHandler } = require('./core/error-middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Backend is running',
  });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;