const http = require('http');
const routes = require('./routes');
console.log("rebase master");
console.log("useless change1");
const server = http.createServer(routes);
server.listen(3000);