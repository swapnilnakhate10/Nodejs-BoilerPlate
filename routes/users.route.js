let express = require('express');
let router = express.Router();
let log4js = require("log4js");
const logger = log4js.getLogger("Users Routes");
let usersInterceptor = require('../interceptors/users.interceptor');
let usersController = require('../controllers/users.controller');

logger.debug("Users Routes Initiated");

router.post('/', usersInterceptor.createUser, usersController.createUser);

module.exports = router;