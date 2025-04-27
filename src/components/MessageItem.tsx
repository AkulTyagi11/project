import React from 'react';
import { Message } from '../types/chat';

interface MessageItemProps {
  message: Message;
  isLatest: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isLatest }) => {
  const isUser = message.sender === 'user';
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        animation: isLatest ? 'message-appear 0.3s ease' : 'none'
      }}
    >
      <div className={`max-w-[80%] lg:max-w-[60%] relative ${isUser ? 'order-2' : 'order-1'}`}>
        <div 
          className={`p-4 rounded-2xl ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
          }`}
        >
          <p className="text-sm lg:text-base">{message.content}</p>
        </div>
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;