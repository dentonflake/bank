// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Import custom modules
const Game = require('./assets/game')
const Player = require('./assets/player')

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
    console.clear();
    console.log(`Server is running on port ${port}`);
});

// Game object
let games = []

// Handle admin connections
io.of('/host').on('connection', (socket) => {
    games.push(
        new Game(socket)
    )





    // socket.emit('update', game)

    socket.on('start', () => {
        game.active = true

        socket.emit('start', game)
        io.of('/client').emit('start')


    })

    socket.on('disconnect', () => {
        if (games) {
            games = games.filter(game => game.id !== socket.id);
        }
    })
})

// Handle client connections
io.of('/client').on('connection', (socket) => {
    socket.on('join', (name) => {
        if (game.host) {
            if (!game.active) {

                let client = new Player(
                    name,
                    socket.id
                )

                game.clients.push(client)

                socket.emit('join')
            } else {
                socket.emit('reject', `Sorry ${name}, the game has already started!`)
            }
        } else {
            socket.emit('reject', `Sorry ${name}, waiting for someone to host the game!`)
        }
    })

    socket.emit('update', (game) => {

    })

    socket.on('disconnect', () => {
        if (game.clients) {
            game.clients = game.clients.filter(client => client.id !== socket.id);
        }

        io.of('/admin').emit('update', game);
    })
})
