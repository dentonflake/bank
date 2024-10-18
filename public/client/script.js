// Initialize a connection to the server
const socket = io();

function handleJoin() {
    let name = document.getElementById("input").value;

    if (name != "") {

        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "grid";
        document.querySelector('#player h1').textContent = name;

        socket.emit('player', name);
    } else {
        alert("Please enter your name")
    }
}