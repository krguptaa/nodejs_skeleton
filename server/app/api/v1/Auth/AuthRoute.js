'use strict';
const router = require('express').Router();
const controller = require('./AuthController');
const verifyUser = require('./Authenticate').verifyUser;
const validator = require('./AuthRequest');

router.get('/', (req, res) => res.send('Hello World!'));

router.post('/login', verifyUser(), controller.login);

router.post('/register', validator.register, controller.register);

router.post('/forgot-password', (req, res) => res.send('Forgot Password!'));

module.exports = router;