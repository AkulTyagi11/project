import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message, ChatState } from '../types/chat';

const API_URL = 'http://localhost:5000/api';

const ChatInterface: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
  });

  // Load initial tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        
        if (Object.keys(tasks).length > 0) {
          // Create a welcome message with task summary
          const taskCount = Object.keys(tasks).length;
          const welcomeMessage: Message = {
            id: 'welcome',
            content: `Welcome! I'm AKTAM AI. You have ${taskCount} tasks. Type "list tasks" to see them or ask me any questions.`,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setChatState(prev => ({
            ...prev,
            messages: [...prev.messages, welcomeMessage],
          }));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSendMessage = async (content: string) => {
    // Create a user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    // Add user message to chat
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));
    
    try {
      // Send message to the backend API
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      
      const data = await response.json();
      
      // Create bot response message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Create error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't connect to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
      }));
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <ChatHeader />
      <MessageList messages={chatState.messages} isTyping={chatState.isTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;