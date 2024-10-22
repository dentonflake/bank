class Game {
    constructor(socket) {
        this.socket = socket
        this.active = false

        this.round = {
            current: 0,
            total: 10
        }

        this.clients = [

        ]

        this.turn = 0
        this.bank = 0

        this.code = this.generateCode()
    }

    generateCode() {
        const a = Math.floor(1000 + Math.random() * 9000)
        const b = Math.floor(1000 + Math.random() * 9000)
        this.socket.emit('create', `${a}-${b}`)
    }
}

module.exports = Game