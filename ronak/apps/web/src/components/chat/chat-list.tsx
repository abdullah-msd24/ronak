import React from 'react';
import { useChat } from '../../hooks/use-chat';
import ChatListItem from './chat-list-item';

const ChatList = () => {
  const { chats, loading, error } = useChat();

  if (loading) {
    return <div>Loading chats...</div>;
  }

  if (error) {
    return <div>Error loading chats: {error.message}</div>;
  }

  return (
    <div className="chat-list">
      {chats.length === 0 ? (
        <div>No chats available</div>
      ) : (
        chats.map(chat => (
          <ChatListItem key={chat.id} chat={chat} />
        ))
      )}
    </div>
  );
};

export default ChatList;