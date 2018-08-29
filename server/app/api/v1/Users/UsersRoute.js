'use strict';
const router = require('express').Router();
import UserModel from './User';
import UsersController from './UsersController';

const usersCtrl = new UsersController(UserModel);

router.post('/forgot-password', usersCtrl.forgotPassword);

router.post('/change-password/:token', usersCtrl.changepassword);


module.exports = router;
