import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full h-[600px] md:h-[700px] max-w-4xl">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;