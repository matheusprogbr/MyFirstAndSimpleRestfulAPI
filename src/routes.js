const express = require('express');
const clients = require('./app/controllers/clients');
const routes = express.Router();

routes.get('/clients',clients.index);

routes.get('/clients/:id',clients.show);
routes.post('/clients',clients.post);
routes.put('/clients',clients.put);
routes.delete('/clients',clients.delete);

module.exports = routes;