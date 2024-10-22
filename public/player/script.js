// Initiate connection to the server
const socket = io('/client');

// Run when player joins the game
function handleJoin() {
    let name = document.getElementById("input").value

    if (name != "") {
        socket.emit(
            'join',
            name
        );
    } else {
        alert('Please enter a name!')
    }
}

// Player successfully joined
socket.on('join', () => {
    document.getElementById("menu").style.display = "none";
    document.getElementById("wait").style.display = "grid";
})

// Player was rejected
socket.on('reject', (message) => {
    alert(message)
})















socket.on('start', () => {
    document.getElementById("wait").style.display = "none";
    document.getElementById("game").style.display = "grid";
})

socket.on('gameUpdate', (game) => {
    document.querySelector("#round h1").textContent = 'Round: ' + game.round.current
    document.querySelector("#pot h1").textContent = game.bank
})

function playerUpdate() {
    document.querySelector("#player h1").textContent = client.name
    document.querySelector("#rank h1").textContent = 'Rank: ' + client.rank
    document.querySelector("#bank h1").textContent = client.bank
}