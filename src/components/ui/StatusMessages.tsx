'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';

export default function StatusMessages() {
  const { statusMessage, clearStatusMessage } = useGameStore();

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        clearStatusMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [statusMessage, clearStatusMessage]);

  if (!statusMessage) return null;

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-red-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-indigo-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-black/80 text-white p-4 rounded-lg mb-2 border-l-4 ${getStatusColor(
          statusMessage.type
        )} animate-slide-in`}
      >
        {statusMessage.message}
      </div>
    </div>
  );
}