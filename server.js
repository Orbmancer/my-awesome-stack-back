'use strict';

// app-module-path
require('app-module-path').addPath('./my-awesome-stack-shared/src');

// SERVER
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4242 });

// ROUTE
server.route({
    method: 'GET',
    path: '/gif/random',
    handler: function (request, reply) {

        var gif = require('shared/gif');

        gif.getRandomGIF()
            .then(function(data) {
                reply(data).code(200);
            })
            .catch(function(err) {
                reply(err).code(500);
            })
    }
});

// LAUNCH THE ROCKET
server.start(function(err){

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});