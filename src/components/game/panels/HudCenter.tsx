'use client';

import React from 'react';
import { Text, Center } from '@mantine/core';
import { Card } from '@/components/ui';

export interface HudCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * HudCenter - Shell component for central HUD/battlefield display
 * Row 2 - Middle position
 * No logic implemented - purely structural
 */
export default function HudCenter({ className, ...props }: HudCenterProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      {...props}
    >
      <Center className="h-full">
        <Text size="sm" c="dimmed">
          HUD Center
        </Text>
      </Center>
    </Card>
  );
}
