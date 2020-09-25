const express = require('express');
const routes = require('./routes');
const clients = require('./clients.js');
const app = express();

app.use(express.static('public'));
app.use(routes);

app.listen('3000', () => {
  console.log('Server is running!');
});