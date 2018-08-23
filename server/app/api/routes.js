'use strict';
const router = require('express').Router();

const authModule = require('./v1/Auth/AuthRoute');

// api router will mount other routers
// for all our resources

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our apis' });
});


// Group of Auth Route Api
router.use('/auth', authModule);


module.exports = router;
