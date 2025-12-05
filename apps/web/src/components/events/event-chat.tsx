import React, { useEffect, useState } from 'react';
import { useChat } from '../../hooks/use-chat';
import { MessageBubble } from './chat/message-bubble';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const EventChat = ({ eventId }) => {
  const { messages, sendMessage, fetchMessages } = useChat(eventId);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <div className="flex items-center p-4 border-t">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default EventChat;