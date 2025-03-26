// Connessione al server Socket.IO
const socket = io();
// Seleziona gli elementi del DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
const messagesList = document.getElementById('messages');
// Invia il messaggio al server quando si clicca sul pulsante "Invia"
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('chatMessage', message); // Invia il messaggio al server
        messageInput.value = ''; // Resetta il campo di input
    }
});
// Ascolta i messaggi dal server e li mostra nella lista
socket.on('chatMessage', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    messagesList.appendChild(li);
});