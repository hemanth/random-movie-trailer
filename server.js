var http = require('http');
var randomMovie = require('random-movie');
var movieTrailer = require('movie-trailer');

var server = http.createServer(function (request, response) {
    if (request.method === 'OPTIONS') {
            var headers = {};
            headers["Access-Control-Allow-Origin"] = request.headers.origin;
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = true;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
            response.writeHead(200, headers);
            response.end();
    }
    else {
      randomMovie(function(err, data) {
          movieTrailer(data.Title, function (err, url) {
              var headers = {};
              headers["Access-Control-Allow-Origin"] = '*';
              headers["Content-type"] = "text/json";
              response.writeHead(200, headers);
              response.end(JSON.stringify({url: url}));
          });
      });
    }

});

var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server running at http://127.0.0.1/ on port " + port);
