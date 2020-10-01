const http = require('http');

http.createServer((req, res) => {
  res.write('Hello, World!');
  res.end();
}).listen(8080);

console.log('Server started! Listening on port 8080');
