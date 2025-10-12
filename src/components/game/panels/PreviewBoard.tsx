'use client';

import React, { useState } from 'react';
import { Text, Center, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Card } from '@/components/ui';

export interface PreviewBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the preview board (left or right)
   * Reserved for future use when logic is implemented
   */
  position?: 'left' | 'right';
  className?: string;
  /**
   * Enable miniature mode with scaling (default: true)
   */
  miniature?: boolean;
  /**
   * Scale percentage for miniature mode (default: 0.65 = 65%)
   */
  scale?: number;
  /**
   * Content to display in the preview board (placeholder text by default)
   */
  children?: React.ReactNode;
}

/**
 * PreviewBoard - Component for previewing opponent/player boards
 * Row 2 - Side positions (left and right)
 * Features miniature mode with scaling and expand on hover/tap
 */
export default function PreviewBoard({ 
  position = 'left', // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
  miniature = true,
  scale = 0.65,
  children,
  ...props 
}: PreviewBoardProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate hover scale (slightly larger than miniature but not 100%)
  const hoverScale = miniature ? Math.min(scale + 0.1, 0.85) : 1;

  // Content to render (placeholder or custom children)
  const content = children || (
    <Center className="h-full">
      <Text size="sm" c="dimmed">
        Preview Board
      </Text>
    </Center>
  );

  return (
    <>
      <Card 
        variant="glass" 
        padding="md" 
        className={className}
        style={{
          cursor: miniature ? 'pointer' : 'default',
          transform: miniature ? `scale(${isHovered ? hoverScale : scale})` : 'scale(1)',
          transformOrigin: 'center',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
        onMouseEnter={() => miniature && setIsHovered(true)}
        onMouseLeave={() => miniature && setIsHovered(false)}
        onClick={() => miniature && open()}
        {...props}
      >
        {content}
      </Card>

      {/* Expanded Modal View */}
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        centered
        title={`Preview Board (${position})`}
        styles={{
          title: {
            fontWeight: 600,
            fontSize: '1.25rem',
          },
        }}
        transitionProps={{
          transition: 'fade',
          duration: 200,
        }}
      >
        <div style={{ minHeight: '300px' }}>
          {content}
        </div>
      </Modal>
    </>
  );
}
