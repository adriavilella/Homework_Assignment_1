/**
 * 
 * Basic RESTFul JSON API 
 * It supports both HTTP and HTTPS protocols
 * It has a config file in order to setup the desired configuration settings
 * 
 * @classdesc Basic RESTFul JSON API
 * @author Adrià vilella
 * @version 0.0.1
 */

// Dependencies
const http = require('http');
const https = require('https');
const serverHelper = require ('./library/serverhelper');
const config = require('./config');
const fs = require('fs');

// Creates the server that process each request
const httpServer= http.createServer(serverHelper.processRequest);

// Start the HTTP server
httpServer.listen(config.httpPort,function(){
  console.log('The HTTP server is up and running on port '+ config.httpPort);
});

// Configure the HTTPS server options (syncronously)
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

// Instantiate the HTTPS server
var httpsServer = https.createServer(httpsServerOptions,serverHelper.processRequest);

// Start the HTTPS server
httpsServer.listen(config.httpsPort,function(){
 console.log('The HTTPS server is running on port '+config.httpsPort);
});
