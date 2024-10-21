const socket = io('/admin');

let players = []

socket.on('update', (clients) => {
    players = clients
})

function loop() {
    // let players = document.getElementById('players')
    // players.innerHTML = ''

    // clients.forEach(client => {
    //     let player = document.createElement('div')
    //     player.className = 'grid-item center'
    //     player.id = client.id

    //     let name = document.createElement('h1')
    //     name.textContent = client.name

    //     player.appendChild(name)
    //     players.appendChild(player)
    // });

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)


// socket.on('quit', (data) => {
//     document.getElementById(`${data.id}`).remove()
// })

// function handleStart() {
//     alert('test')
// }