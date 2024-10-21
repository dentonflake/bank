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