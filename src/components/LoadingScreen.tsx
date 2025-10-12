'use client';

import { useGameStore } from '@/lib/store';
import { Card } from '@/components/ui';
import { Progress } from '@mantine/core';

export default function LoadingScreen() {
  const { deckImporting, isJoiningRoom, statusMessage } = useGameStore();

  const getLoadingMessage = () => {
    if (deckImporting) {
      return "Importing deck from Moxfield...";
    }
    if (isJoiningRoom) {
      return "Joining game room...";
    }
    return statusMessage?.message || "Loading...";
  };

  const getLoadingDetails = () => {
    if (deckImporting) {
      return "Downloading card data and images. This may take a moment.";
    }
    if (isJoiningRoom) {
      return "Setting up your game session.";
    }
    return "Please wait...";
  };

  return (
    <div className="loading-screen flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-600 to-secondary-700 p-4">
      <Card 
        variant="glass" 
        padding="lg"
        className="text-center max-w-md w-full"
      >
        {/* Loading Spinner */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
        </div>

        {/* Loading Message */}
        <h2 className="text-xl font-bold text-white mb-2">
          {getLoadingMessage()}
        </h2>
        
        <p className="text-white/70 text-sm mb-4">
          {getLoadingDetails()}
        </p>

        {/* Progress Indicator */}
        {deckImporting && (
          <Progress
            value={60}
            size="sm"
            radius="xl"
            animated
            className="mb-4"
            styles={{
              root: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              section: {
                backgroundColor: 'white',
              },
            }}
          />
        )}

        {/* Status Message */}
        {statusMessage && (
          <div className={`text-sm p-3 rounded-lg ${
            statusMessage.type === 'error' 
              ? 'bg-red-500/20 text-red-200 border border-red-500/50' 
              : statusMessage.type === 'success'
              ? 'bg-green-500/20 text-green-200 border border-green-500/50'
              : 'bg-blue-500/20 text-blue-200 border border-blue-500/50'
          }`}>
            {statusMessage.message}
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 text-xs text-white/50">
          <p>💡 Tip: Larger decks may take longer to load</p>
        </div>
      </Card>
    </div>
  );
}