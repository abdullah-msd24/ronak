import React from 'react';

interface MessageBubbleProps {
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, timestamp, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs p-2 rounded-lg ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        <p className="font-semibold">{sender}</p>
        <p>{message}</p>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;