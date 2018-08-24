'use strict';
const router = require('express').Router();
const controller = require('./AuthController');
import UserModel from './../Users/User';
import UsersController from './../Users/UsersController';
const verifyUser = require('./Authenticate').verifyUser;
const validator = require('./AuthRequest');

const usersCtrl = new UsersController(UserModel);

router.get('/', (req, res) => res.send('Hello World!'));

router.post('/login', verifyUser(), controller.login);

router.post('/register', validator.register, controller.register);

router.post('/forgot-password', usersCtrl.forgotPassword);

module.exports = router;
