import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';  // Importa io correttamente

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: any;
  message: string = '';
  messages: string[] = [];

  ngOnInit() {
    // Connessione al server Flask con Socket.IO
    this.socket = io('http://localhost:5000');  // Modifica l'URL se necessario

    // Ascolta i messaggi ricevuti
    this.socket.on('message', (msg: string) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      // Invia il messaggio al server Flask
      this.socket.emit('message', this.message);
      this.messages.push(this.message);
      this.message = '';  // Pulisce la casella di testo
    }
  }
}
