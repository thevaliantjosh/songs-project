let http = require('js/spotify-web-api.js');

http
    .createServer(function(request, response) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Hello World');
        response.end();
    })
    .listen(8888);