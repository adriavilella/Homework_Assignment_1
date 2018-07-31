/**
 * Handlers definition based on the URL path
 * 
 * The handler must produce the object or value to send back to the client
 * This information will be returned into the 'data' field of the JSON returned object.
 */

 const handlers ={};

 handlers.hello = (requestedResource, handlerCallback) => {
  
    handlerCallback(200,'Hello World!!, I\'m here');
 };

 handlers.notFound = (requestedResource, handlerCallback) => {
    handlerCallback(404,'Path not found');
 };
 
 module.exports=handlers;
