const config = require('./configurations');
const express = require('express');
const cors = require('cors');
const bodayParser = require('body-parser');
const morgan = require('morgan');
const db = require('./configurations/database');


const app = express();

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(cors());

app.use(bodayParser.text())

const routes = require('./routes');

app.use('/', routes);

app.use((err, _req, res, next) => {
  if (err.statusCode === 404) return next();
  res.status(500).json({
    err: err.message,
    msg: '500 Internal server error.',
    data: null,
  });
});

app.use((_req, res) => {
  res.status(404).json({
    err: null,
    msg: '404 Not found.',
    data: null,
  });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});