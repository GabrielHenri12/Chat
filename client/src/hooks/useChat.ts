import { useState, useEffect } from 'react'
import io from 'socket.io-client';

export const useChat = () => {
    const socket = io('http://192.168.1.159:3000');
    //const [socket, setSocket] = useState<any>();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const newSocket = io('http://192.168.1.159:3000');
    //     setSocket(newSocket);

    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        socket.on('chat-message', (data: any) => {
            alert(data)
            setChatMessages((prevMessages) => [...prevMessages, data]);
        });

        if (socket) {

            socket.on('user-list', (users: any) => {
                setUsers(users);
            });

            socket.on('user-connected', (data: any) => {
                const message = `${data.username} entrou no chat.`;
                setChatMessages((prevMessages) => [...prevMessages, message]);
            });

            socket.on('user-disconnected', (socketId: any) => {
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

    return {
        username,
        users,
        chatMessages,
        message,
        setUsername,
        setMessage,
        handleLogin,
        handleSendMessage,
    }
}