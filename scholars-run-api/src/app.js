const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error('Unhandled request error:', err);
  return res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

module.exports = app;
