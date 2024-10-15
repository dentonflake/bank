const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

let players = []

io.on('connection', (socket) => {
    socket.on('start', (name) => {
        players.push({
            name: name,
            id: socket.id,
            bank: 0,
            rank: null
        })

        socket.emit('start', name)
    })

    socket.on('disconnect', () => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id == socket.id) {
                players.splice(i, 1)
            }
        }
    })
})

console.log("teda")

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`)
})