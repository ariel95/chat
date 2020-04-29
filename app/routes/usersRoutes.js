const express = require('express');
const Router = express.Router();
const controllers = require('../controllers/usersControllers');

/* GET users listing. */
Router.get('/', controllers.getUsers);

module.exports = Router;