/**
 * Routes definition based on the handlers
 * 
 */

// Import the hardlers definitions
const handlers = require('./library/handlers');

// creates the router object
const routes = {
  'hello' : handlers.hello,
  'notFound': handlers.notFound
};

// Export the route object
module.exports = routes;