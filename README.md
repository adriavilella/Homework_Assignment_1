# This is my Homework Assignment #1
## This is a "Hello World" RestFul JSON API

**Project description**

This is a very simple RESTFul JSON API.

The resources / services available are exposed to the *routes.js* file.

The resource's implementations are defined in *'/library/handlers.js'*

We producte a JSON response back to the client. This answer contains some useful metadata as well as the API response itself in the *'data'* field.

You can examine the *'success'* field in order to know if everythink was okay.

Nowadys, the API has only an entry point '/hello'.
Any other call, will produce a 'Path not found' error.

There is a *config.js* file in order to set up different environments (see production, staging),tcp/ip ports, SSL certificates, an so on.

The console logs the server activity for every request / response
