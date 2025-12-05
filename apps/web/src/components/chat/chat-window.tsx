import React, { useEffect, useState } from 'react';
import { useChat } from '../../hooks/use-chat';
import { MessageBubble } from './message-bubble';
import { EmojiPicker } from './emoji-picker';

const ChatWindow = ({ roomId }) => {
    const { messages, sendMessage, fetchMessages } = useChat(roomId);
    const [newMessage, setNewMessage] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, [roomId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button onClick={handleSendMessage} className="send-button">Send</button>
                <button onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className="emoji-button">😊</button>
                {emojiPickerVisible && <EmojiPicker onSelect={(emoji) => setNewMessage(newMessage + emoji)} />}
            </div>
        </div>
    );
};

export default ChatWindow;