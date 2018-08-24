require('./globals');

const express = require('express');
const app = express();
const appMiddlware = require(`${__dirMiddleware}AppMiddleware`);
const route = require(`${__dirApi}/routes`);
const errorHandlerMiddlware = require(`${__dirMiddleware}ErrorHandlerMiddleware`);


// setup the app middlware
appMiddlware(app);

// setup the api
app.use('/api/v1/', route);

// Centralize Error  Handler
app.use(errorHandlerMiddlware());

// export the app for testing / web application
module.exports = app;
