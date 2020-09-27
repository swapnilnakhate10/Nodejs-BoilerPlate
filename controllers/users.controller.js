let express = require('express');
let log4js = require("log4js");
let usersService = require('../services/users.service');

const logger = log4js.getLogger("Users Controller");

module.exports = {
    createUser : createUser,
    loginUser : loginUser
};

function createUser(req, res) {
  logger.debug("Inside createUser");
  let userDetails = req.body;
  usersService.createUser(userDetails, (err, result) => {
    if(err) {
      logger.error("Create User : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success create User : "+result);
      res.status(200).send(result);
    }
  });
}

function loginUser(req, res) {
  logger.debug("Inside createUser");
  let userCredentials = req.body;
  usersService.loginUser(userCredentials, (err, result) => {
    if(err) {
      logger.error("Login User : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success Login User : "+result);
      res.status(200).send(result);
    }
  });
}
