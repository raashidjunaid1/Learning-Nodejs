const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write ('<html>');
        res.write ('<head><titile>Enter message</title></head>');
        res.write ('<body><form action="/message" method = "POST"><input type="text" name="message" placeholder="do nothing"></input><button type="submit">Submit</button></form></body>');
        res.write ('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', function (data) {
            body.push(data);
            console.log(body);
        });

        req.on('end', function () {
            const newBody = Buffer.concat(body).toString();
            console.log(newBody);
            fs.writeFileSync("message.txt", newBody.split('=')[1]);
            console.log (newBody.split('=')[1]);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
}

module.exports = requestHandler;