'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/lib/store';

export default function Chat() {
  const [message, setMessage] = useState('');
  const { chatMessages, sendChatMessage } = useGameStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendChatMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-area bg-black/30 border-t border-white/10 flex flex-col max-h-48">
      <div className="chat-messages flex-1 p-4 overflow-y-auto text-sm">
        {chatMessages.map((chat, index) => (
          <div key={index} className="mb-2">
            <strong className="text-indigo-300">{chat.playerName}:</strong>{' '}
            <span className="text-white/90">{chat.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input flex p-4 gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
        />
        <button
          onClick={handleSendMessage}
          className="btn small bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}