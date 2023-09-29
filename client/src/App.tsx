import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import './App.css'

function App() {
  const socket = io('http://192.168.1.159:3000');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('chat-message', (data) => {
        alert(data)
        //setChatMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on('user-list', (users) => {
        setUsers(users);
      });

      socket.on('user-connected', (data) => {
        const message = `${data.username} entrou no chat.`;
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('user-disconnected', (socketId) => {
        const message = `${users[socketId]} saiu do chat.`;
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket, users]);

  const handleLogin = () => {
    if (username.trim() !== '') {
      socket.emit('user-login', username);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat-message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat com Socket.io</h1>
      {username ? (
        <div>
          <div>
            <h2>Usuários Conectados:</h2>
            <ul>
              {users.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              {chatMessages.map((chatMessage, index) => (
                <div key={index}>{chatMessage}</div>
              ))}
            </div>
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
              />
              <button onClick={handleSendMessage}>Enviar</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário"
          />
          <button onClick={handleLogin}>Entrar</button>
        </div>
      )}
    </div>
  );
}

export default App
