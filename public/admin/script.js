// Initialize a connection to the server
const socket = io();

socket.emit('admin');

socket.on('join', (data) => {
    let players = document.getElementById('players')

    let player = document.createElement('div')
    player.className = 'grid-item'
    player.id = `${data.id}`

    let name = document.createElement('h1')
    name.textContent = data.name

    player.appendChild(name)
    players.appendChild(player)
})

socket.on('quit', (data) => {
    document.getElementById(`${data.id}`).remove()
})

function handleStart() {
    alert('tets')
}