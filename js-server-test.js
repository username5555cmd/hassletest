const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    const data = {
        'trimmedPath': trimmedPath,
        'queryStringObject': parsedUrl.query,
        'method': req.method.toLowerCase(),
        'headers': req.headers
    };

    chosenHandler(data, (statusCode, payload) => {
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        payload = typeof(payload) == 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
    });
});

server.listen(3000, () => {
    console.log('The server is listening on port 3000 |Z2hwX0tSTk45a2U1dmhkempROVFZMjcyU1VZcmUweWRQWjJkVFBnYg==|');
});

const handlers = {};

handlers.hello = (data, callback) => {
    callback(200, { 'message': 'Hello, this is a simple Node.js server!' });
};

handlers.notFound = (data, callback) => {
    callback(404);
};

const router = {
    'hello': handlers.hello
};