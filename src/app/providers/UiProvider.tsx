'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { mantineTheme } from '@/theme/mantineTheme';

// Import Mantine styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

interface UiProviderProps {
  children: React.ReactNode;
}

/**
 * UiProvider - Centralized UI framework provider
 * 
 * This component wraps the entire application with Mantine's provider,
 * ensuring consistent theming and component behavior across the app.
 * 
 * Features:
 * - Dark mode by default (matching game aesthetic)
 * - Custom theme with MTG-inspired colors
 * - Notification system for user feedback
 * - Global component defaults
 */
export function UiProvider({ children }: UiProviderProps) {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
      <Notifications position="top-right" zIndex={1000} />
      {children}
    </MantineProvider>
  );
}
