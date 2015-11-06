// Thu Oct 29 21:17:52 2015
//  creation of tests
//

var assert = require('assert');
var http = require('http');
var server = require('../server.js');


describe('basic tests of server ', function() {

    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });


    // test cases
    //
    // look at the output the describe() function defines main headers to group tests
    //  the it() function is outputed under the tests in the describe() function
    //  thing of this as an outline
    //  basic tests of server
    //          contacting...
    //          the path ->...
    //          /about should....
    //          send this URI
    //                requesting /xxx....

    describe(' send this URI to the server /xxx should return an HTTP status of 404', function() {
        it(' requesting /xxx from the server should return 404', function(done) {
            http.get('http://localhost:8080/xxx', function(res) {
                assert.equal(404, res.statusCode);
                done();
            });
        });
    });


    describe(' send this URI to the server ?id=xxx should return an HTTP status of 404', function() {
        it(' requesting ?id=xxx from the server should return 404', function(done) {
            http.get('http://localhost:8080/?id=xxx', function(res) {
                assert.equal(404, res.statusCode);
                done();
            });
        });
    });

    it('contacting the server root URL should return 200', function(done) {
        http.get('http://localhost:8080/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    // Node uses the 'on()'  function to register event handlers
    // the first parameter defines when the handler function is called
    //  the second part is the handler function
    it(' the path -> / should output Whoohoo', function(done) {
        http.get('http://localhost:8080/', function(res) {
            assert.equal(200, res.statusCode);

            var data = '';
            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                assert.equal('Whoohoo!', data);
                done();
            });
        });
    });

    // Node uses the 'on()'  function to register event handlers
    // the first parameter defines when the handler function is called
    //  the second part is the handler function
    it(' /about should output  -> A simple routing example with Node', function(done) {
        http.get('http://localhost:8080/about', function(res) {
            assert.equal(200, res.statusCode);

            var data = '';
            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                assert.equal('A simple routing example with Node', data);
                done();
            });
        });
    });
}); // end of basic tests