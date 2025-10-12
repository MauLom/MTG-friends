'use client';

import React from 'react';
import { Container, Grid, Box, Stack } from '@mantine/core';
import { cn } from '@/lib/utils';

export interface GameStageProps extends React.HTMLAttributes<HTMLDivElement> {
  // Row 1 - Top: info | onTurn | actions
  info?: React.ReactNode;
  onTurn?: React.ReactNode;
  actions?: React.ReactNode;
  
  // Row 2 - Middle: prevLeft | hudCenter | prevRight
  prevLeft?: React.ReactNode;
  hudCenter?: React.ReactNode;
  prevRight?: React.ReactNode;
  
  // Row 3 - Bottom: self
  self?: React.ReactNode;
}

export default function GameStage({
  info,
  onTurn,
  actions,
  prevLeft,
  hudCenter,
  prevRight,
  self,
  className,
  ...props
}: GameStageProps) {
  return (
    <Container
      fluid
      className={cn('h-full p-4 overflow-x-hidden', className)}
      {...props}
    >
      <style jsx>{`
        @media (max-width: 767px) {
          .game-stage-row-hud { order: 1; }
          .game-stage-row-controls { order: 2; }
          .game-stage-row-self { order: 4; }
        }
      `}</style>
      <Stack gap="md" className="h-full">
        {/* Mobile order: HUD(1) → OnTurn(2) → Actions(3) → Self(4) → Previews(5,6) → Info(7)
            Using CSS order property to reorder on mobile while maintaining desktop layout
        */}
        
        {/* Row 2: prevLeft | hudCenter | prevRight
            Desktop (≥768px): 3 equal columns (33% each)
            Tablet (640-767px): Stacked vertically
            Mobile (<640px): HudCenter first (order 1), Previews after Self (order 5-6)
        */}
        <Box className="flex-1 min-h-0 game-stage-row-hud">
          <Grid gutter="md" className="h-full">
            {/* HudCenter: First on mobile (order 1), center on desktop */}
            <Grid.Col 
              span={{ base: 12, md: 4 }} 
              order={{ base: 1, md: 2 }}
            >
              <Box className="overflow-auto h-full min-h-[44px]">
                {hudCenter || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full flex items-center justify-center">
                    <p className="text-white/50 text-sm text-center">HUD Center</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            
            {/* PrevLeft: After Self on mobile (order 5), left on desktop */}
            <Grid.Col 
              span={{ base: 12, md: 4 }} 
              order={{ base: 5, md: 1 }}
            >
              <Box className="overflow-auto h-full min-h-[44px]">
                {prevLeft || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Previous Player (Left)</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            
            {/* PrevRight: After prevLeft on mobile (order 6), right on desktop */}
            <Grid.Col 
              span={{ base: 12, md: 4 }} 
              order={{ base: 6, md: 3 }}
            >
              <Box className="overflow-auto h-full min-h-[44px]">
                {prevRight || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Previous Player (Right)</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Row 1: info | onTurn | actions
            Desktop (≥768px): 3 columns (25% | 50% | 25%)
            Tablet (640-767px): 2 columns (onTurn full width, then actions|info)
            Mobile (<640px): OnTurn(2) → Actions(3) → Info(7)
        */}
        <Box className="min-h-[80px] max-h-[120px] game-stage-row-controls">
          <Grid gutter="md">
            {/* OnTurn: Second on mobile (order 2), center on desktop */}
            <Grid.Col 
              span={{ base: 12, sm: 12, md: 6 }} 
              order={{ base: 2, sm: 1, md: 2 }}
            >
              <Box className="overflow-auto h-full max-h-[120px] min-h-[44px]">
                {onTurn || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full flex items-center justify-center">
                    <p className="text-white/50 text-sm text-center">Turn Tracker</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            
            {/* Actions: Third on mobile (order 3), right on tablet/desktop */}
            <Grid.Col 
              span={{ base: 12, sm: 6, md: 3 }} 
              order={{ base: 3, sm: 2, md: 3 }}
            >
              <Box className="overflow-auto h-full max-h-[120px] min-h-[44px]">
                {actions || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Actions Panel</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            
            {/* Info: Last on mobile (order 7), left on tablet/desktop */}
            <Grid.Col 
              span={{ base: 12, sm: 6, md: 3 }} 
              order={{ base: 7, sm: 3, md: 1 }}
            >
              <Box className="overflow-auto h-full max-h-[120px] min-h-[44px]">
                {info || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Info Panel</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Row 3: self (full width on all breakpoints)
            Mobile: Fourth (order 4)
        */}
        <Box className="min-h-[150px] max-h-[200px] game-stage-row-self">
          <Box className="overflow-auto h-full min-h-[44px]">
            {self || (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                <p className="text-white/50 text-sm">Self Player Zone</p>
              </div>
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
