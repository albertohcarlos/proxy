const express = require('express');
const navController = require('../controllers/navController');

const api = express.Router();

api.get('/api/search/:query', navController.searchQuery);
api.get('/api/item/:id', navController.item);

module.exports = api