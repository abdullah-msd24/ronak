import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL);

    socketInstance.emit('joinRoom', roomId);

    socketInstance.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { roomId, content: newMessage });
      setNewMessage('');
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
  };
};

export default useChat;