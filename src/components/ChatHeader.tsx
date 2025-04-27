import React from 'react';
import { Bot } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AKTAM AI</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Always online</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Active</span>
      </div>
    </div>
  );
};

export default ChatHeader;