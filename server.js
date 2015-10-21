// David Novogrodsky
// this is the file that exposes server functionality
// Wed Oct 21 00:03:05 2015

var http = require('http');

http.createServer(function(request,response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('Woohoo!');
}).listen(8080);
