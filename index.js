// Require globals data, which will set all global variables
require('./server/globals');

// Creating server by starting our application
const app = require(`${__dirServer}`);

// grab the defined port from config file
const config = require(`${__dirServer}config/app`);

// Listing our app on specified port
app.listen(config.port);
console.log('listening on ' + config.app_url + ':' + config.port);
