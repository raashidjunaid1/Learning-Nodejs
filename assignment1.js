const http = require('http');
const fs = require('fs');
const server = http.createServer(handleRequests);
server.listen(3000);

function handleRequests (req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Home Page</title></head>');
        res.write('<body><a href="/users">users</a></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/users') {
        res.write('<html>');
        res.write('<head><title>Users Page</title></head>');
        res.write('<body><form action="/createUser" method="POST"><input type="text" name="username"></input><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        res.end();
    }

    if(url === '/createUser' && method === 'POST') {
        const body = [];
        req.on('data', (data) => {
            body.push(data);
            console.log(body);
        })

        req.on('end', () => {
            console.log(body);
            const username = Buffer.concat(body).toString().split('=')[1];
            console.log(username);
            fs.writeFileSync("usernames", username);
            res.statusCode = 302;
            res.setHeader ('Location', '/');
            return res.end();
        })
    }
}