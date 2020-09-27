let express = require('express');
const config = require('config');
let log4js = require("log4js");
const bcrypt = require('bcrypt');
let mailService = require('./mail.service');
let usersDao = require('../dao/users.dao');
const logger = log4js.getLogger("Users Service");
logger.debug("Banner Service Initiated");

module.exports = {
    createUser : createUser,
    loginUser: loginUser
};

async function createUser(userDetails, callback) {
  logger.debug('Initiated createUser');
  userDetails.password = encryptPassword(userDetails.password);
  logger.debug('Hash password : '+userDetails.password);
  let newUserDetails = await usersDao.insertOne(userDetails);
  if(newUserDetails && newUserDetails._id) {
    logger.debug('User created successfully : '+newUserDetails._id);
    callback(null, newUserDetails);
  } else {
    logger.error('Failed to create user : ');
    logger.error(newUserDetails);
    callback(newUserDetails, null);
  }
}

async function loginUser(credentials, callback) {
  logger.debug('Initiated login User');
  let findUserQuery = { username : credentials.username };
  let userDetails = await usersDao.findOne(findUserQuery);
  if(userDetails && userDetails._id) {
     let isPasswordMatched = comparePassword(credentials.password, userDetails.password);
      if(isPasswordMatched) {
        logger.debug('User login successful : '+credentials.username);
        delete userDetails.password;
        callback(null, userDetails);
     } else {
        logger.error('User login Failed : '+credentials.username);
        let error = new Error();
        error.message = "Invalid Credentials";
        callback(error, null);
     }
  } else {
    logger.error('User login Failed : '+credentials.username);
    let error = new Error();
    error.message = "Invalid Credentials";
    callback(error, null);
  }
}

function encryptPassword(plainTextPassword) {
  let saltRounds = config.get('saltRounds');
  const hashPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
  return hashPassword;
}

function comparePassword(plainTextPassword, hashPassword) {
  let isPasswordCorrect = bcrypt.compareSync(plainTextPassword, hashPassword);
  return isPasswordCorrect;
}

