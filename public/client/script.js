const socket = io('/client');

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

let client;

socket.on('join', (data) => {
    client = data

    document.getElementById("menu").style.display = "none";
    document.getElementById("wait").style.display = "grid";
})

socket.on('reject', (message) => {
    alert(message)
})

socket.on('reset', () => {
    window.location.href = '/'
})

socket.on('start', () => {
    document.getElementById("wait").style.display = "none";
    document.getElementById("game").style.display = "grid";

    document.querySelector("#player h1").textContent = client.name
    document.querySelector("#rank h1").textContent = client.rank
})