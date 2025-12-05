import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getChatRoomMessages, sendMessage } from '../../../lib/api';
import ChatWindow from '../../../components/chat/chat-window';
import ChatList from '../../../components/chat/chat-list';

const ChatRoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (roomId) {
      const fetchMessages = async () => {
        const fetchedMessages = await getChatRoomMessages(roomId);
        setMessages(fetchedMessages);
      };
      fetchMessages();
    }
  }, [roomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(roomId, newMessage);
      setNewMessage('');
      // Optionally, fetch messages again or update state to include the new message
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatList roomId={roomId} />
      <ChatWindow
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatRoomPage;