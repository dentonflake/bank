// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
require('dotenv').config();

// Initialize the app and create a server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory (optional)
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Example: Receiving a message from the client
    socket.on('message', (msg) => {
        console.log('Message received:', msg);

        // Sending a message back to the client
        io.emit('message', `Server says: ${msg}`);
    });

    // When the client disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
