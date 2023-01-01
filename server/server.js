const express = require("express");
const http = require("http"); // TODO: update to an HTTPS server 
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("public"));

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const connectedClients = new Map();

//app.get('/', (request, response) => {
//    response.sendFile(__dirname + "/client/src/index.js");
//});

io.on('connection', (socket) => {
    console.log(`client ${socket.id} has connected to the server`);
    connectedClients.set(socket.id, {
        ipAddress: typeof socket.request.connection.remoteAddress !== 'undefined' ? socket.request.connection.remoteAddress : "undefined",
        userAgent: 'user-agent' in socket.request.headers ? socket.request.headers['user-agent'] : "undefined",
        queryParams: typeof socket.request.query !== 'undefined' ? socket.request.query : "undefined"
    });
    console.log(connectedClients.get(socket.id));
    console.log(`${connectedClients.size} online`);

    socket.on('disconnect', () => {
        console.log(`client ${socket.id} has disconnected from the server... pussy`);
        connectedClients.delete(socket.id);
        console.log(`${connectedClients.size} online`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});