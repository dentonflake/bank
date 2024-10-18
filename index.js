const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

let users = {
    admins: [],
    players: []
}

io.on('connection', (socket) => {
    socket.on('player', (name) => {
        users.players.push({
            name: name,
            id: socket.id,
        })
    })

    socket.on('admin', () => {
        users.admins.push({
            id: socket.id
        })
    })

    socket.on('disconnect', () => {
    })
})


server.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server is running on port ${process.env.PORT}`)
})