import React from 'react';
import { useChat } from '../../../hooks/use-chat';
import ChatList from '../../../components/chat/chat-list';
import ChatWindow from '../../../components/chat/chat-window';

const ChatPage = () => {
  const { chatRooms, selectedRoom, selectRoom } = useChat();

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-300">
        <ChatList chatRooms={chatRooms} onSelectRoom={selectRoom} />
      </div>
      <div className="w-2/3">
        {selectedRoom ? (
          <ChatWindow roomId={selectedRoom.id} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat room to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;