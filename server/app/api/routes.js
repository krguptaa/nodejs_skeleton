'use strict';
const router = require('express').Router();

const authModule = require('./v1/Auth/AuthRoute');
const userModule = require('./v1/Users/UsersRoute');

// api router will mount other routers
// for all our resources

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our apis' });
});


// Group of Auth Route Api
router.use('/auth', authModule);

// Group of Auth Route Api
router.use('/users', userModule);

module.exports = router;
