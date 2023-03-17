const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const routerList = require('./router/index');
require('dotenv').config({ path: path.join(__dirname, '.env') });


const port = process.env.PORT || 8000;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/health', (req, res) => res.send({ message: 'ok' }));
_.each(routerList, function (routerConfig) {
  _.map(routerConfig, function (value, key) {
    app.use(key, require(value));
  });
});

const server = app.listen(port, () => {
    console.log(`THM App running on port ${port}.`);
});
module.exports = server;
