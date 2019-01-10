const http = require('http');
const routes = require('./routes');
console.log("rebase master");
const server = http.createServer(routes);
server.listen(3000);