import React, { useEffect, useState } from 'react';
import { useChat } from '../../hooks/use-chat';
import { Message } from '../../types';
import MessageBubble from '../chat/message-bubble';
import EmojiPicker from '../chat/emoji-picker';

const CommunityChat = ({ communityId }) => {
  const { messages, sendMessage, fetchMessages } = useChat(communityId);
  const [newMessage, setNewMessage] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

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
        {messages.map((message: Message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <div className="flex items-center p-2 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className="ml-2">
          😊
        </button>
        <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
      {emojiPickerVisible && <EmojiPicker onSelect={(emoji) => setNewMessage(newMessage + emoji)} />}
    </div>
  );
};

export default CommunityChat;