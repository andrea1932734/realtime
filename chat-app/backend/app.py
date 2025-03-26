from flask import Flask, render_template
from flask_socketio import SocketIO, send
from flask_cors import CORS  # Importa CORS

app = Flask(__name__)
socketio = SocketIO(app)

# Abilita CORS per tutti i domini (o specifica un dominio se vuoi limitarlo)
CORS(app, origins=["http://localhost:4200", "https://4200-andrea1932734-realtime-va47vsd5tqq.ws-eu118.gitpod.io"])


@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
    print(f"Messaggio ricevuto: {msg}")
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
