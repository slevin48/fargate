const http = require('http');
const server = http.createServer(function(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(`[${ip}] ${req.method} ${req.url}`);
    res.end('Hi there!\n');

});

server.listen(8080);