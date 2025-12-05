import React, { useState } from 'react';
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline';

const EmojiPicker = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const emojis = ['😀', '😂', '😍', '😢', '😡', '😎', '🤔', '🥳', '😱', '😴'];

  const togglePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (emoji) => {
    onSelect(emoji);
    togglePicker();
  };

  return (
    <div className="relative">
      <button onClick={togglePicker} className="flex items-center p-2">
        <EmojiHappyIcon className="h-6 w-6 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white border rounded shadow-lg p-2">
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSelect(emoji)}
                className="text-2xl"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;