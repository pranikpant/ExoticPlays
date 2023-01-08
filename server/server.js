const express = require("express");
const http = require("http"); // TODO: update to an HTTPS server 
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const authenticateUser = async (email, password) => {
    return true;
};

const connectedClients = new Map();

app.post('/api/auth/login', (request, response) => {
    console.log("login attempt: ", request.body);
    const { email, password } = request.body;
    if (authenticateUser(email, password)) {
        response.status(200).json({ success: true });
    } else {
        response.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
    }
});

io.on('connection', (socket) => {
    console.log(`client ${socket.id} has connected to the server`);
    connectedClients.set(socket.id, {
        ipAddress: typeof socket.request.connection.remoteAddress !== 'undefined' ? socket.request.connection.remoteAddress : "undefined",
        userAgent: 'user-agent' in socket.request.headers ? socket.request.headers['user-agent'] : "undefined",
        queryParams: typeof socket.request.query !== 'undefined' ? socket.request.query : "undefined"
    });
    console.log(connectedClients.get(socket.id));
    console.log(`${connectedClients.size} online`);

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} has joined room ${room}`);
    });

    socket.on("send_message", (data) => {
        console.log(socket.id, data);
        socket.to(data.room).emit("receive_message", data);
      });

    socket.on('disconnect', () => {
        console.log(`client ${socket.id} has disconnected from the server... pussy`);
        connectedClients.delete(socket.id);
        console.log(`${connectedClients.size} online`);
    });
});

