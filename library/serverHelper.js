/**
 * A helper server object for request processing
 */

 // Load dependencies
const url = require('url');
const DecoderProcessor = require('string_decoder').StringDecoder;
const routes = require ('../routes');

// defining the server helper
const serverHelper = {};

/**
 * Process the incomming request regardless of the protocol
 * 
 * @param {Incomingmessage} request The request object
 * @param {ServerResponse} response The response object
 */
serverHelper.processRequest = (request,response) => {

    // Parse the url as an object
    var requestedUrlObj= url.parse(request.url,true,true);

    // Get the url path
    var path=requestedUrlObj.pathname;

    // trim the "/" out of the path using a regular expression
    var trimedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    var queryStringObj = requestedUrlObj.query;

    // Get the HTTP method, in uppercase
    var httpMethod = request.method.toUpperCase();

    //Get the headers as an object
    var httpHeadersObj = request.headers;

    // Get the stream payload,if any
    var decoder = new DecoderProcessor('utf-8');
    var buffer = '';

    // Setup a handler for 'data' event. Get the payload if any
    request.on('data', function(data) {
        buffer += decoder.write(data);
    });
    
    // Setup the handler for 'end' event. Process the incoming request
    request.on('end', function() {
        buffer += decoder.end();

        // Construct the JSON object to send to the handler
        var requestedServiceObj = {
        'requestedPpath' : trimedPath,
        'queryString' : queryStringObj,
        'method' : httpMethod,
        'headers' : httpHeadersObj,
        'payload' : buffer
        };

        // Log the request
        console.log("\n\rINCOMMING REQUEST =====");
        console.log(requestedServiceObj);
        
        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        var chosenHandler = typeof(routes[trimedPath]) !== 'undefined' ? routes[trimedPath] : routes['notFound'];

        // Route the request to the handler specified in the router
        chosenHandler(requestedServiceObj,(statusCode,payload) => {
            
            /**
             * Create the default response JSON object
             * The response Object contains some useful metadata
             * the 'data' property contains the response JSON
             */
            var responseOjb={
                'requestedResource':requestedServiceObj.requestedPpath,
                'responseTimeStamp':new Date().toString(),
                'success': true,
                'data': payload
            };

            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Assign the success status
            if (statusCode == 200) { 
                responseOjb.success=true
            }else{
                responseOjb.success= false
            } 
    
            // Convert the full response Obj to a string
            var responseObjString = JSON.stringify(responseOjb);
    
            // Peroducing JSON content type
            response.setHeader('Content-Type','application/json');

            // write the status code hearder back to the client
            response.writeHead(statusCode);

            // sendig back the response
            response.end(responseObjString);

            // log the response
            console.log("\r\nOUTCOMMING RESPONSE =====");
            console.log(statusCode,responseOjb);
        });
    });    
};


module.exports=serverHelper;