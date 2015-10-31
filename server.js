// David Novogrodsky
// this is the file that exposes server functionality
// Wed Oct 21 00:03:05 2015

var http = require('http');
var path = require('path');
var url = require('url');

// this module is needed to serve static files
var fs = require('fs');


// defining our routes, for the router function
var pages = [
    {id: '1', route: '/',  output: 'Whoohoo!'},
    {id: '2', route: '/about', output: 'A simple routing example with Node'},
    // anonymous function
    {id: '3', route: '/another page', output:  function() {return 'Here\'s ' + this.route; } },
    {id: '4', route: '/about/me', output: 'My name is David'}
    ];

// adding mime types so the server knows what to do with them
var mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css'
};

// make cache for static files
//this is an object
var cache = {};

// function to get  and put stuff into cache
function cacheAndDeliver(filepath, cb) {
    // adding in some stuff for time checking
    fs.stat(filepath,  function(err, stats) {
        var lastChanged = Date.parse(stats.ctime);
        isUpdated = (cache[filepath]) && lastChanged > cache[filepath].timestamp;
            if ( !cache[filepath] || isUpdated ) {
                fs.readFile(filepath, function(err, data) {
                    if (!err){
                        cache[filepath] = {content : data, timestamp: Date.now()};  // store a Unix timestamp
                    }
                    cb(err, data);
                });
                return;
            }
            //console.log( 'loading ' + filepath + ' from cache'  );
            cb( null,  cache[filepath].content );
    }); // end of fs.stat
} // end of cacheAndDeliver

http.createServer(function(request,response) {
    // first get the part of the URI after host name
    // decode the URI so spaces look like %20
    // when using just decodeURI, add '/' to the routing
    var lookup = decodeURI(request.url) || 'index.html';
    filepath = 'content/' + lookup;


    // check if there is a query string
    var id = url.parse(decodeURI(request.url), true).query.id;

    // checking to serve static
    // this is assynchronus, uses callback function
    fs.exists(filepath, function(exists) {
       // console.log(exists ? lookup + " is a static file " : lookup + " is not a static file");
        if (exists) {
            cacheAndDeliver(filepath,  function(err, data) {
                if (err) {
                    response.writeHead(500);
                    response.end('Server error!! ');
                    return;  }
                var headers = {'Content-type' : mimeTypes[path.extname(lookup)] };
                response.writeHead(200, headers);
                response.end(data);
            });
            return;
        }
        response.writeHead(404);
        response.end('Page Not Found!');
        return;
    });


   // for each possible route in the array check against  incoming lookup
    pages.forEach(function(page) {
        if (page.route === lookup) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            // respone can be a string or  function call, a noun or a verb
            response.end(typeof page.output === 'function' ? page.output() : page.output);
        } else if (id ) {
            // for each possible route in the array check against  incoming query id
            pages.forEach(function(page) {
                if (page.id === id) {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    // respone can be a string or  function call, a noun or a verb
                    response.end(typeof page.output === 'function' ? page.output() : page.output);
                }
            });
        }
    });
}).listen(8080);
