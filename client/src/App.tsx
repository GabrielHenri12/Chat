import './App.css'
import { useChat } from './hooks/useChat';

function App() {
  const { username, users, chatMessages, message, setMessage, handleLogin, handleSendMessage, setUsername } = useChat();

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
