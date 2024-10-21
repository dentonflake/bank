// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables from .env file
require('dotenv').config();

// Initialize an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize a new instance of Socket.IO with the HTTP server
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the port for the server
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
    console.clear(); // Clears the console on each server restart
    console.log(`Server is running on port ${port}`);
});

// Game object
let game = {
    active: false,
    rounds: 0,
    clients: []
}

// Handle admin connections
io.of('/admin').on('connection', (socket) => {
    socket.emit('update', game.clients)

    socket.on('start', () => {
        game.active = true

        socket.emit('start', game.active)
        io.of('/client').emit('start')
    })

    socket.on('disconnect', () => {
        game = {
            active: false,
            clients: []
        }

        io.of('/client').emit('reset')
    })
})

// Handle client connections
io.of('/client').on('connection', (socket) => {
    socket.on('join', (name) => {
        if (!game.active) {
            let client = {
                name: name,
                id: socket.id,
                rank: game.clients.length + 1,
                points: 0
            }

            game.clients.push(client)

            socket.emit('join', client)
            io.of('/admin').emit('update', game.clients);
        } else {
            socket.emit('reject', `Sorry ${name}, the game has already started!`)
        }
    })

    socket.on('disconnect', () => {
        if (game.clients) {
            game.clients = game.clients.filter(client => client.id !== socket.id);
        }

        io.of('/admin').emit('update', game.clients);
    })
})

// io.of('/admin').emit('update', game.clients);
