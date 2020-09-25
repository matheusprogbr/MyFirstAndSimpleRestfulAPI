const express = require('express');
const clients = require('./app/controllers/clients');
const routes = express.Router();

app.get('/clients/:id',clients.show);
app.post('/clients',clients.post);
app.put('/clients:id',clients.put);
app.delete('/clients/:id',clients.delete);

module.exports = routes;