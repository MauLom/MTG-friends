'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import { notifications } from '@mantine/notifications';

export default function StatusMessages() {
  const { statusMessage, clearStatusMessage } = useGameStore();

  useEffect(() => {
    if (statusMessage) {
      const notificationConfig = {
        title: '',
        message: statusMessage.message,
        autoClose: 3000,
        withBorder: true,
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      };

      switch (statusMessage.type) {
        case 'error':
          notifications.show({
            ...notificationConfig,
            color: 'red',
            title: 'Error',
          });
          break;
        case 'success':
          notifications.show({
            ...notificationConfig,
            color: 'green',
            title: 'Success',
          });
          break;
        default:
          notifications.show({
            ...notificationConfig,
            color: 'primary',
            title: 'Info',
          });
          break;
      }

      clearStatusMessage();
    }
  }, [statusMessage, clearStatusMessage]);

  // This component no longer renders anything visible, 
  // as notifications are handled by Mantine's notification system
  return null;
}