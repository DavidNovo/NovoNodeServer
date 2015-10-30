// Thu Oct 29 21:17:52 2015
//  creation of tests
//

var assert  =  require('assert');
var http      =  require('http');
var server = require( '../server.js' );


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

      describe('/ should return an HTTP status of 200', function () {
            it('should return 200', function (done) {
                  http.get('http://localhost:8080/', function (res) {
                        assert.equal(200, res.statusCode);
                        done();
                  });
            });
      });

      describe('/xxx should return an HTTP status of 404', function () {
            it('should return 404', function (done) {
                  http.get('http://localhost:8080/xxx', function (res) {
                        assert.equal(404, res.statusCode);
                        done();
                  });
            });
      });

      // Node uses the 'on()'  function to register event handlers
      // the first parameter defines when the handler function is called
      //  the second part is the handler function
      describe('/ should output Whoohoo', function () {
            it(' should output Whoohoo', function (done) {
                  http.get('http://localhost:8080/', function (res) {
                        assert.equal(200, res.statusCode);

                        var data = '';
                        res.on('data', function (chunk) {
                              data += chunk;
                        });

                        res.on('end', function () {
                              assert.equal('Whoohoo!', data );
                              done();
                        });
                  });
            });
      });

}); // end of basic tests

