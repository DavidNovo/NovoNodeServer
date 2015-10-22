// David Novogrodsky
// this is the file that exposes server functionality
// Wed Oct 21 00:03:05 2015

var http = require('http');
var path = require('path');

// defining our routes, for the router function
var pages = [
    {route: '', output: 'Whoohoo!'},
    {route: 'about', output: 'A simple routing example with Node'},
    // anonymous function
    {route: 'another page', output:  function() {return 'Here\'s ' + this.route; } }
];

http.createServer(function(request,response) {
    // first get the part of the URI after host name
    // decode the URI so spaces look like %20
    var lookup = path.basename(decodeURI(request.url));

    // for each possible route in the array check against  incoming lookup
    pages.forEach(function(page) {
        if (page.route === lookup) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            // respone can be a string or  function call, a noun or a verb
            response.end(typeof page.output === 'function' ? page.output() : page.output);
        }
    });
    if (!response.finished) {
        response.writeHead(404);
        response.end('Page Not Found!');
    }
}).listen(8080);
