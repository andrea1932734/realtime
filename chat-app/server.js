const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// Crea un'app Express
const app = express();
const server = http.createServer(app);
// Collega il server HTTP a Socket.IO
const io = socketIo(server);
// Impostiamo una cartella pubblica per i file statici
app.use(express.static('public'));
// Gestiamo gli eventi di connessione con Socket.IO
io.on('connection', (socket) => {
    console.log('Un utente si è connesso');
    // Ascoltiamo il messaggio "chatMessage" e lo inviamo a tutti gli altri utenti
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });
    // Gestiamo la disconnessione dell'utente
    socket.on('disconnect', () => {
        console.log('Un utente si è disconnesso');
    });
});
// Avvia il server
server.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
});