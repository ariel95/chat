const express = require('express');
const Router = express.Router();
const controllers = require('../controllers/indexController');

/* GET home page. */
Router.get('/', controllers.index);

Router.post('/', controllers.chat);

      
module.exports = Router;