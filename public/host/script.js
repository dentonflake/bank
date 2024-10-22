const socket = io('/host');

socket.on('create', (code) => {
    alert(code)
})



function handleStart() {
    socket.emit('start')
}







socket.on('start', (active) => {
    game.active = active

    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "grid";

    updateTurn()
    updateLeaderboard()
})

function updateTurn() {
    for (let client of game.clients) {
        if (client.turn == game.turn) {
            document.querySelector('#name h1').textContent = client.name
        }
    }

    game.clients.forEach(client => {
        let player = document.createElement('div')
        player.className = 'grid-item'
        player.id = 'player'

        let name = document.createElement('h1')
        name.textContent = `${client.rank}. ${client.name}`

        let points = document.createElement('h1')
        points.textContent = `${client.points}`

        player.appendChild(name)
        player.appendChild(points)
        players.appendChild(player)
    });
}

function updateLeaderboard() {
    let players = document.getElementById('leaderboard')
    players.innerHTML = ''

    let title = document.createElement('div')
    title.className = 'grid-item title center'

    let text = document.createElement('h1')
    text.textContent = 'Leaderboard'

    title.appendChild(text)
    players.appendChild(title)

    game.clients.forEach(client => {
        let player = document.createElement('div')
        player.className = 'grid-item'
        player.id = 'player'

        let name = document.createElement('h1')
        name.textContent = `${client.rank}. ${client.name}`

        let points = document.createElement('h1')
        points.textContent = `${client.points}`

        player.appendChild(name)
        player.appendChild(points)
        players.appendChild(player)
    });
}

socket.on('update', (clients) => {
    game = clients

    if (!game.active) {
        let players = document.getElementById('players')
        players.innerHTML = ''

        game.clients.forEach(client => {
            let player = document.createElement('div')
            player.className = 'grid-item center'
            player.id = client.id

            let name = document.createElement('h1')
            name.textContent = client.name

            player.appendChild(name)
            players.appendChild(player)
        });
    }
})