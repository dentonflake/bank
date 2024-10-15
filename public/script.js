// Initialize a connection to the server
const socket = io();

function handleStart() {
    let name = document.getElementById("input").value;

    if (name != "") {

        document.getElementById("create").style.display = "none";
        document.getElementById("player").style.display = "grid";

        socket.emit('start', name);
    } else {
        alert("Please enter your name")
    }
}

socket.on('start', (name) => {
    document.querySelector('#name h1').textContent = name;
})