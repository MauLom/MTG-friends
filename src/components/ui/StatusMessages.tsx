'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

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

  const getStatusStyles = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-4 border-l-error-500 bg-error-500/10 text-error-200';
      case 'success':
        return 'border-l-4 border-l-success-500 bg-success-500/10 text-success-200';
      default:
        return 'border-l-4 border-l-primary-500 bg-primary-500/10 text-primary-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card
        variant="glass"
        padding="md"
        className={cn(
          'animate-slide-in max-w-sm',
          getStatusStyles(statusMessage.type)
        )}
      >
        {statusMessage.message}
      </Card>
    </div>
  );
}