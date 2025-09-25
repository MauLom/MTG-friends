'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/lib/store';
import { Button, Input, Card } from '@/components/ui';

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
    <Card 
      variant="glass" 
      padding="none" 
      className="border-t border-white/10 flex flex-col max-h-48"
    >
      <div className="flex-1 p-4 overflow-y-auto text-sm space-y-2">
        {chatMessages.map((chat, index) => (
          <div key={index} className="animate-fade-in">
            <strong className="text-primary-300">{chat.playerName}:</strong>{' '}
            <span className="text-white/90">{chat.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex p-4 gap-3 border-t border-white/10">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="glass"
          size="sm"
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          variant="primary"
          size="sm"
        >
          Send
        </Button>
      </div>
    </Card>
  );
}