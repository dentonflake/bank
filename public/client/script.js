// Initialize a connection to the server
const socket = io();

function handleJoin() {
    let name = document.getElementById("input").value;

    if (name != "") {

        document.getElementById("create").style.display = "none";
        document.getElementById("player").style.display = "grid";
        document.querySelector('#name h1').textContent = name;

        socket.emit('player', name);
    } else {
        alert("Please enter your name")
    }
}