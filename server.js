// David Novogrodsky
// this is the file that exposes server functionality
// Wed Oct 21 00:03:05 2015

var http = require('http');
var path = require('path');
var url = require('url');


// defining our routes, for the router function
var pages = [
    {id: '1', route: '/',  output: 'Whoohoo!'},
    {id: '2', route: '/about', output: 'A simple routing example with Node'},
    // anonymous function
    {id: '3', route: '/another page', output:  function() {return 'Here\'s ' + this.route; } },
    {id: '4', route: '/about/me', output: 'My name is David'}
];

http.createServer(function(request,response) {
    // first get the part of the URI after host name
    // decode the URI so spaces look like %20
    // when using just decodeURI, add '/' to the routing
    var lookup = decodeURI(request.url);

    // check if there is a query string
    var id = url.parse(decodeURI(request.url), true).query.id;

    if (id ) {
        // for each possible route in the array check against  incoming query id
        pages.forEach(function(page) {
            if (page.id === id) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                // respone can be a string or  function call, a noun or a verb
                response.end(typeof page.output === 'function' ? page.output() : page.output);
            }
        });
    } else {
        // for each possible route in the array check against  incoming lookup
        pages.forEach(function(page) {
            if (page.route === lookup) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                // respone can be a string or  function call, a noun or a verb
                response.end(typeof page.output === 'function' ? page.output() : page.output);
            }
        });
        }

    if (!response.finished) {
        response.writeHead(404);
        response.end('Page Not Found!');
    }
}).listen(8080);
